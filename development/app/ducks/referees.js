'use strict';

const ADD_REFEREE = 'couch-ref/referees/ADD_REFEREE'

export default function reducer(state = {}, action){
  switch(action.type){
    case ADD_REFEREE:
      return Object.assign({}, state, {
        [action.referee.id]: action.referee
      });

    default:
      return state;
  }
};

export function addReferee(referee) {
  return {type: ADD_REFEREE, referee: referee};
}
