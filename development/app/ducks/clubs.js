'use strict';

import _ from 'lodash';

const ADD_CLUBS = 'couch-ref/clubs/ADD_CLUBS'

export default function reducer(state = [], action){
   switch(action.type){
      case ADD_CLUBS:
      return _.sortBy(action.clubs, ['shortName']);

      default:
      return state;
   }
};

export function addClubs(clubs) {
   return {type: ADD_CLUBS, clubs: clubs};
}
