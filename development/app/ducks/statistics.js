'use strict';

import firebase from 'firebase';

import references from '../core/references';
import {createStatistic} from '../core/mappers';

const STATISTICS_UPDATE = 'couch-ref/statistics/STATISTICS_UPDATE'
const ADD_STATISTIC = 'couch-ref/statistics/ADD_STATISTIC'

export default function reducer(state = {}, action){
  switch(action.type){
    case STATISTICS_UPDATE:
      return Object.assign({}, state, {
        [action.results.id]: action.results
      });

    case ADD_STATISTIC:
      return Object.assign({}, state, {
        [action.results.id]: action.results
      });

    default:
      return state;
  }
};

export function updateStatistic(results) {
  return {type: STATISTICS_UPDATE, results: results};
}

export function addStatistic(results) {
  return {type: ADD_STATISTIC, results: results};
}

export function loadArchivedStatistic(statistic, redirect) {
   return (dispatch) => {
      var db = firebase.database();
      db.ref(references.archiveStatistics + '/' + statistic).once('value').then((snap) => {
         if (!snap.exists()){
            redirect ? redirect() : null;
            return;
         }

         var archived = snap.val();
         dispatch(addStatistic(createStatistic(archived)));
      });
   };
}
