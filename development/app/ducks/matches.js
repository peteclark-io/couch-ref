'use strict'

import _ from 'lodash';

const MATCH_UPDATE = 'couch-ref/matches/MATCH_UPDATE'
const ADD_MATCH = 'couch-ref/matches/ADD_MATCH'

function sort(arr){
  return _.sortBy(arr, ['fullTime', 'kickOff']);
}

export default function reducer(state = {matches: []}, action){
  var match = action.match;

  switch(action.type){
    case MATCH_UPDATE:
      console.log('Handling update', match);
      return Object.assign({}, state, {
        matches: sort([
          ..._.differenceWith(state.matches, [match], (val, compare) => {return val.id === compare.id}),
          match
        ])
      });

    case ADD_MATCH:
      return Object.assign({}, state, {
        matches: sort([
          ...state.matches,
          match
        ])
      });
    default:
      return state;
  }
};

export function updateMatch(match) {
  return {type: MATCH_UPDATE, match: match};
}

export function addMatch(match) {
  return {type: ADD_MATCH, match: match};
}
