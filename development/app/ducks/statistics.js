'use strict';

const STATISTICS_UPDATE = 'couch-ref/statistics/STATISTICS_UPDATE'
const ADD_STATISTIC = 'couch-ref/statistics/ADD_STATISTIC'

function getUpdatedState(action){
  var results = action.results;
  var updated = {};
  updated[results.id] = results;
  return updated;
}

export default function reducer(state = {}, action){
  switch(action.type){
    case STATISTICS_UPDATE:
      return Object.assign({}, state, getUpdatedState(action));

    case ADD_STATISTIC:
      return Object.assign({}, state, getUpdatedState(action));

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
