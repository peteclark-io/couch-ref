'use strict';

const ADD_ERROR = 'couch-ref/errors/ADD_ERROR'

export default function reducer(state = {}, action){
  switch(action.type){
    case ADD_ERROR:
      return Object.assign({}, state, {
         [action.code]: {
            code: action.code,
            message: action.msg
         }
      });

    default:
      return state;
  }
};

export function addError(msg, code) {
  return {type: ADD_ERROR, msg: msg, code: code};
}
