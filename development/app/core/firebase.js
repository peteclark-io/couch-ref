'use strict'

import firebase from 'firebase';
import moment from 'moment';

import {updateMatch, addMatch} from '../ducks/matches';
import {updateQuestion, addQuestion} from '../ducks/questions';
import {updateStatistic, addStatistic} from '../ducks/statistics';

import {createMatch, createQuestion, createStatistic} from './mappers';

import {authenticated} from '../ducks/authenticated';
import {addClubs} from '../ducks/clubs';
import {inspectFirebase} from '../ducks/user';

import Users from './users';

const openDatabase = (store, db, mapper, update, add) => {
   db.off();
   var dispatchAdd = function(data){
      store.dispatch(add(mapper(data.val())));
   };

   var dispatchUpdate = function(data){
      store.dispatch(update(mapper(data.val())));
   };

   db.on('child_added', dispatchAdd);
   db.on('child_changed', dispatchUpdate);
};

const data = (store) => {
   return {
      init: function(router, path){
         var config = {
            apiKey: "AIzaSyAoRaeRoKYx6Q_tuOVeK753OWmtuJEyQX8",
            authDomain: "couchref-9962e.firebaseapp.com",
            databaseURL: "https://couchref-9962e.firebaseio.com",
            storageBucket: "couchref-9962e.appspot.com",
            messagingSenderId: "416088688451"
         };

         var provider = new firebase.auth.GoogleAuthProvider();

         firebase.initializeApp(config);

         firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
               couchRef(user);
            } else {
               firebase.auth().getRedirectResult().then((auth) => {
                  if (!auth.user){
                     console.log('User not authenticated!');
                     router.push('/login');
                     return;
                  }

                  couchRef(auth.user);
               }).catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  router.push('/error');
               });
            }
         });

         const couchRef = (user) => {
            console.log('Connected to Couch Ref.', user);
            store.dispatch(inspectFirebase({
               remote: {
                  uid: user.uid,
                  fullName: user.displayName
               }
            }));

            store.dispatch(authenticated());

            var database = firebase.database();

            var userUid = database.ref('/v0/users/' + user.uid);
            var clubs = database.ref('/v0/clubs');
            var userVotes = database.ref('/v0/users-votes/' + user.uid);

            var liveMatches = database.ref('/v0/live-matches');
            var liveQuestions = database.ref('/v0/live-questions');
            var liveStatistics = database.ref('/v0/live-statistics');

            openDatabase(store, liveMatches, createMatch, updateMatch, addMatch);
            openDatabase(store, liveQuestions, createQuestion, updateQuestion, addQuestion);
            openDatabase(store, liveStatistics, createStatistic, updateStatistic, addStatistic);

            clubs.once('value').then((snapshot) => {
               store.dispatch(addClubs(snapshot.val()));
               var sesh = Users(path, store, router);

               userVotes.once('value').then((votesSnap) => {
                  sesh.loadVotes(votesSnap.val());
               });

               userUid.once('value').then((userSnap) => {
                  sesh.loadUser(userSnap.val());
               });
            });
         }
      }
   };
}

export default data;
