'use strict'

import firebase from 'firebase';
import moment from 'moment';

import {updateMatch, addMatch} from '../ducks/matches';
import {updateQuestion, addQuestion} from '../ducks/questions';
import {updateStatistic, addStatistic} from '../ducks/statistics';

import {addReferee} from '../ducks/referees';
import {addError} from '../ducks/errors';

import {createMatch, createQuestion, createStatistic, createReferee} from './mappers';

import {authenticated} from '../ducks/authenticated';
import {addClubs} from '../ducks/clubs';
import {inspectFirebase} from '../ducks/user';

import {saveUserData} from './db-actions';

import references from './references';

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

const admin = (user) => {
   /*if (user.uid === 'statcxdCyrM1470IAcy3KiBqXI43'){
      console.log('Admin user connected to CouchRef', user.uid);
      user = {uid:'QcSMqm71JAdan9CFSy1rrGiuW7y1',displayName:'Omar Kassam', email: 'omar.kassam'}
      console.log('Admin registered as', user);
   }*/
   return user;
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
               couchRef(admin(user));
            } else {
               firebase.auth().getRedirectResult().then((auth) => {
                  if (!auth.user){
                     console.log('User not authenticated!');
                     router.push('/login');
                     return;
                  }

                  couchRef(admin(auth.user));
               }).catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  store.dispatch(addError(errorMessage, errorCode));

                  if (errorCode === 'auth/operation-not-supported-in-this-environment'){
                     router.push('/private-browser');
                     return;
                  }
                  router.push('/error');
               });
            }
         });

         const couchRef = (user) => {
            console.log('Connected to Couch Ref.', user.uid);
            store.dispatch(inspectFirebase({
               remote: {
                  uid: user.uid,
                  fullName: user.displayName,
                  email: user.email
               }
            }));

            store.dispatch(authenticated());

            var database = firebase.database();

            saveUserData(user);

            var userUid = database.ref(references.users + '/' + user.uid);
            var clubs = database.ref(references.clubs);
            var userVotes = database.ref(references.answers + '/' + user.uid);
            var referees = database.ref(references.referees);

            var liveMatches = database.ref(references.matches);
            var liveQuestions = database.ref(references.questions);
            var liveStatistics = database.ref(references.statistics);

            openDatabase(store, liveMatches, createMatch, updateMatch, addMatch);
            openDatabase(store, liveQuestions, createQuestion, updateQuestion, addQuestion);
            openDatabase(store, liveStatistics, createStatistic, updateStatistic, addStatistic);

            openDatabase(store, referees, createReferee, addReferee, addReferee);

            clubs.once('value').then((snapshot) => {
               store.dispatch(addClubs(snapshot.val()));
               var sesh = Users(path, store, router);

               userVotes.once('value').then((votesSnap) => {
                  if (votesSnap.val()){
                     sesh.loadVotes(votesSnap.val());
                  }
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
