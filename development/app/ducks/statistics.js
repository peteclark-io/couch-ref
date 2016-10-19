'use strict';

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
