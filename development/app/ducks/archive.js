'use strict';

import firebase from 'firebase';

import references from '../core/references';
import {createMatch, createQuestion, createStatistic} from '../core/mappers';

const LOAD_MATCH = 'couch-ref/archive/LOAD_MATCH'
const LOAD_QUESTION = 'couch-ref/archive/LOAD_QUESTION'
const LOAD_STATISTICS = 'couch-ref/archive/LOAD_STATISTICS'

export default function reducer(state = {}, action){
   switch(action.type){
      case LOAD_MATCH:
      return Object.assign({}, state, {
         matches: Object.assign({}, state.matches, {
            [action.match.id]: action.match
         })
      });

      case LOAD_QUESTION:
      return Object.assign({}, state, {
         questions: Object.assign({}, state.questions, {
            [action.question.id]: action.question
         })
      });

      case LOAD_STATISTICS:
      return Object.assign({}, state, {
         statistics: Object.assign({}, state.statistics, {
            [action.statistic.id]: action.statistic
         })
      });

      default:
      return state;
   }
};

export function loadMatch(match, redirect) {
   return (dispatch) => {
      var db = firebase.database();
      db.ref(references.archiveMatches + '/' + match).once('value').then((snap) => {
         if (!snap.exists()){
            redirect ? redirect() : null;
            return;
         }

         var archived = snap.val();

         dispatch({type: LOAD_MATCH, match: createMatch(archived)});

         if (!archived.questions){
            return;
         }

         archived.questions.map(q => {
            db.ref(references.archiveQuestions + '/' + q.id).once('value').then(snap => {
               var archivedQ = snap.val();
               dispatch({type: LOAD_QUESTION, question: createQuestion(archivedQ)});
            });
         });
      });
   };
}

export function loadQuestion(question, redirect) {
   return (dispatch) => {
      var db = firebase.database();
      db.ref(references.archiveQuestions + '/' + question).once('value').then((snap) => {
         if (!snap.exists()){
            redirect ? redirect() : null;
            return;
         }

         var archived = snap.val();
         dispatch({type: LOAD_QUESTION, question: createQuestion(archived)});
      });
   };
}

export function loadQuestionStatistics(question, redirect) {
   return (dispatch) => {
      var db = firebase.database();
      db.ref(references.archiveStatistics + '/' + question).once('value').then((snap) => {
         if (!snap.exists()){
            redirect ? redirect() : null;
            return;
         }

         var archived = snap.val();
         dispatch({type: LOAD_STATISTICS, statistic: createStatistic(archived)});

         db.ref(references.archiveQuestions + '/' + archived.id).once('value').then(snap => {
            var archivedQ = snap.val();
            loadMatch(archivedQ.match)(dispatch);
         });
      });
   };
}
