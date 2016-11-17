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
      console.log('Action found!', match);
      return sort([
        ..._.differenceWith(state, [match], (val, compare) => {return val.id === compare.id}),
        match
      ]);

    case ADD_MATCH:
      console.log('Action found!', match);
      var update = state.filter((entry) => { return entry.id === match.id; }).length > 0;
      console.log('Is update', update);
      if (update){
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
