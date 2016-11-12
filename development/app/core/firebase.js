'use strict'

import firebase from 'firebase';
import moment from 'moment';

import {updateMatch, addMatch} from '../ducks/matches';
import {updateQuestion, addQuestion} from '../ducks/questions';
import {updateStatistic, addStatistic} from '../ducks/statistics';

import {createMatch, createQuestion, createStatistic} from './mappers';

import {ready} from '../ducks/ready';
import {authenticated} from '../ducks/authenticated';
import {inspectFirebase} from '../ducks/user';
import {addClubs} from '../ducks/clubs';

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
          firebase.auth().getRedirectResult().catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            router.push('/error');
          }).then((auth) => {
            if (!auth.user){
              console.log('User not authenticated!');
              router.push('/login');
              return;
            }

            couchRef(auth.user);
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

        var liveMatches = database.ref('/v0/live-matches');
        var liveQuestions = database.ref('/v0/live-questions');
        var liveStatistics = database.ref('/v0/live-statistics');

        //var user = database.ref('/v0/users/' + user.uid);

        openDatabase(store, liveMatches, createMatch, updateMatch, addMatch);
        openDatabase(store, liveQuestions, createQuestion, updateQuestion, addQuestion);
        openDatabase(store, liveStatistics, createStatistic, updateStatistic, addStatistic);

        var clubs = database.ref('/v0/clubs');
        clubs.once('value').then((snapshot) => {
          store.dispatch(addClubs(snapshot.val()));

          userUid.once('value').then((userSnap) => {
             var data = userSnap.val();
             console.log('Loaded user data.', data);
             store.dispatch(ready());

             if (!data){
               router.push('/users');
               return;
             }

             var results = store.getState().clubs.filter((c) => {
                return c.name === data.club;
             });

             var userClub = results.length === 1 ? results[0] : undefined;
             if (userClub){
                store.dispatch(inspectFirebase({
                   club: userClub,
                }));
             } else {
                router.push('/users/club');
             }

             if (data.birthday){
                var parsed = moment(data.birthday);
                if (parsed.isValid()){
                  store.dispatch(inspectFirebase({
                    remote: {
                      birthday: parsed
                    }
                  }));
                } else {
                  router.push('/users/birthday');
                }
             } else {
                router.push('/users/birthday');
             }

             if (data.sex) {
                store.dispatch(inspectFirebase({
                   remote: {
                      sex: data.sex
                   }
                }));
             } else {
                router.push('/users/sex');
                return
             }

             if (data.location) {
                store.dispatch(inspectFirebase({
                   remote: {
                      location: data.location
                   }
                }));
             } else {
                router.push('/users/location');
                return
             }

             router.push(path);
          });
        });
      }
    }
  };
}

export default data;
