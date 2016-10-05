'use strict';

const APP_READY = 'couch-ref/ready/APP_READY';

export default function reducer(state = false, action){
  switch(action.type){
    case APP_READY:
      return action.ready; // should this just be true?
    default:
      return state;
  }
};

export function ready() {
  return {type: APP_READY, ready: true};
};
