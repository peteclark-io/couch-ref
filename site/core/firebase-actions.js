'use strict'

import firebase from 'firebase';

const data = (store) => {
  return {
    init: function(){
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
      }).then(() => {
        var database = firebase.database();
        var couchRef = database.ref('live-matches');

        couchRef.off();
        var dispatch = function(data) {
          store.dispatch({
            type: 'MATCH_UPDATE',
            update: data.val()
          });
        };

        couchRef.on('child_added', dispatch);
        couchRef.on('child_changed', dispatch);
      });
    }
  };
}

export default data;
