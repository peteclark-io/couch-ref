'use strict'

import _ from 'lodash';
import firebase from 'firebase';

import references from '../core/references';
import {createMatch} from '../core/mappers';
import {loadArchivedQuestion} from './questions';
import {loadArchivedStatistic} from './statistics';
import {loadVote} from './user';

const MATCH_UPDATE = 'couch-ref/matches/MATCH_UPDATE'
const ADD_MATCH = 'couch-ref/matches/ADD_MATCH'

export default function reducer(state = {}, action){
   var match = action.match;

   switch(action.type){
      case MATCH_UPDATE:
      return Object.assign({}, state, {
         [action.match.id]: action.match
      });

      case ADD_MATCH:
      return Object.assign({}, state, {
         [action.match.id]: action.match
      });

      default:
      return state;
   }
};

export function loadArchivedMatch(match, redirect) {
   return (dispatch) => {
      var db = firebase.database();
      db.ref(references.archiveMatches + '/' + match).once('value').then((snap) => {
         if (!snap.exists()){
            redirect ? redirect() : null;
            return;
         }

         var archived = snap.val();
         dispatch(addMatch(createMatch(archived)));

         if (!archived.questions){
            return;
         }

         archived.questions.map(q => {
            dispatch(loadArchivedQuestion(q.id));
            dispatch(loadArchivedStatistic(q.id));
         });
      });
   };
}

export function updateMatch(match) {
   return (dispatch) => {
      dispatch({type: MATCH_UPDATE, match: match});
      match.questions.map(q => {
         dispatch(loadVote(q.id));
      });
   };
}

export function addMatch(match) {
   return (dispatch) => {
      dispatch({type: ADD_MATCH, match: match});
      match.questions.map(q => {
         dispatch(loadVote(q.id));
      });
   };
}
