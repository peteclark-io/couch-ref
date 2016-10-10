'use strict'

import firebase from 'firebase';
import {updateMatch, addMatch} from '../ducks/matches';
import {ready} from '../ducks/ready';

function createMatch(value){
  console.log(value);
  return {
    id: value.id,
    kickOff: value.kick_off,
    home: value.home,
    away: value.away,
    goalsHome: value.home_score,
    goalsAway: value.away_score,
    fullTime: value.full_time,
    referee: value.referee,
    homeLineup: value.home_lineup,
    homeSubs: value.home_subs,
    awayLineup: value.away_lineup,
    awaySubs: value.away_subs,
    questions: value.questions ? value.questions : []
  };
}

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
      
      firebase.auth().getRedirectResult().catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        router.push('/error');
      }).then((user) => {
        console.log('Connected to Firebase.', user);
        var database = firebase.database();
        var couchRef = database.ref('/v0/live-matches');

        couchRef.off();
        var dispatchAll = function(data){
           console.log(data.val());
           //store.dispatch(addMatch(createMatch(data.val())));
        };

        var dispatchAdd = function(data){
          store.dispatch(addMatch(createMatch(data.val())));
        };

        var dispatchUpdate = function(data){
          store.dispatch(updateMatch(createMatch(data.val())));
        };

        //couchRef.on('value', dispatchAll);
        couchRef.on('child_added', dispatchAdd);
        couchRef.on('child_changed', dispatchUpdate);

        store.dispatch(ready());
        router.push(path);
      });
    }
  };
}

export default data;
