'use strict'

import firebase from 'firebase';

import {updateMatch, addMatch} from '../ducks/matches';
import {updateQuestion, addQuestion} from '../ducks/questions';
import {updateStatistic, addStatistic} from '../ducks/statistics';

import {ready} from '../ducks/ready';
import {authenticated} from '../ducks/authenticated';

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
    homeSubs: value.home_subs,
    awayLineup: value.away_lineup,
    awaySubs: value.away_subs,
    questions: value.questions ? value.questions : []
  };
}

function createQuestion(value){
  return {
    id: value.id,
    time: value.time,
    asked: value.asked,
    question: value.question,
    description: value.description,
    decision: value.decision,
    controversial: value.controversial
  };
}

function createStatistic(value){
  return {
    id: value.id,
    simple: value.simple,
    breakdown: value.breakdown
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

        store.dispatch(authenticated());

        var database = firebase.database();
        var liveMatches = database.ref('/v0/live-matches');
        var liveQuestions = database.ref('/v0/live-questions');
        var liveStatistics = database.ref('/v0/live-statistics');

        liveMatches.off();
        liveQuestions.off();
        liveStatistics.off();

        var dispatchAddMatch = function(data){
          store.dispatch(addMatch(createMatch(data.val())));
        };

        var dispatchUpdateMatch = function(data){
          store.dispatch(updateMatch(createMatch(data.val())));
        };

        var dispatchAddQuestion = function(data){
          store.dispatch(addQuestion(createQuestion(data.val())));
        };

        var dispatchUpdateQuestion = function(data){
          store.dispatch(updateQuestion(createQuestion(data.val())));
        };

        var dispatchAddStatistic = function(data){
          store.dispatch(addStatistic(createStatistic(data.val())));
        };

        var dispatchUpdateStatistic = function(data){
          store.dispatch(updateStatistic(createStatistic(data.val())));
        };

        liveMatches.on('child_added', dispatchAddMatch);
        liveMatches.on('child_changed', dispatchUpdateMatch);

        liveQuestions.on('child_added', dispatchAddQuestion);
        liveQuestions.on('child_changed', dispatchUpdateQuestion);

        liveStatistics.on('child_added', dispatchAddStatistic);
        liveStatistics.on('child_changed', dispatchUpdateStatistic);

        store.dispatch(ready());
        router.push(path);
      }
    }
  };
}

export default data;
