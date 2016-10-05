'use strict'

import firebase from 'firebase';
import {updateMatch, addMatch} from '../ducks/matches';
import {ready} from '../ducks/ready';

function createMatch(value){
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
    awayLineup: value.away_lineup
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
      };

      firebase.initializeApp(config);

      return firebase.auth().signInAnonymously().catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        router.push('/error');
      }).then(() => {
        var database = firebase.database();
        var couchRef = database.ref('live-matches');

        couchRef.off();
        var dispatchAdd = function(data){
          store.dispatch(addMatch(createMatch(data.val())));
        };

        var dispatchUpdate = function(data){
          var value = data.val();
          store.dispatch(updateMatch(createMatch(data.val())));
        };

        couchRef.on('child_added', dispatchAdd);
        couchRef.on('child_changed', dispatchUpdate);

        store.dispatch(ready());
        router.push(path);
      });
    }
  };
}

export default data;
