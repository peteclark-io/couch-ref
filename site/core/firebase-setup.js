'use strict'

import firebase from 'firebase';

export function init(){
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
  });
};
