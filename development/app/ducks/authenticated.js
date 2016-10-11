'use strict';

const USER_AUTHENTICATED = 'couch-ref/authenticated/USER_AUTHENTICATED';

export default function reducer(state = false, action){
  switch(action.type){
    case USER_AUTHENTICATED:
      return action.authenticated; // should this just be true?
    default:
      return state;
  }
};

export function authenticated() {
  return {type: USER_AUTHENTICATED, authenticated: true};
};
