'use strict'

import _ from 'lodash';

const MATCH_UPDATE = 'couch-ref/matches/MATCH_UPDATE'
const ADD_MATCH = 'couch-ref/matches/ADD_MATCH'

function sort(arr){
  return _.sortBy(arr, ['fullTime', 'kickOff']);
}

export default function reducer(state = [], action){
  var match = action.match;

  switch(action.type){
    case MATCH_UPDATE:
      return sort([
        ..._.differenceWith(state, [match], (val, compare) => {return val.id === compare.id}),
        match
      ]);

    case ADD_MATCH:
      var update = state.filter((entry) => { return entry.id === match.id; }).length > 0;
      if (update){
         console.log('Update found in add!', match);
         return sort([
           ..._.differenceWith(state, [match], (val, compare) => {return val.id === compare.id}),
           match
         ]);
      }

      return sort([...state, match]);
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
