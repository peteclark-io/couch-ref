'use strict';

const QUESTION_UPDATE = 'couch-ref/questions/MATCH_UPDATE'
const ADD_QUESTION = 'couch-ref/questions/ADD_MATCH'

function getUpdatedState(action){
  var question = action.question;
  var updated = {};
  updated[question.id] = question;
  return updated;
}

export default function reducer(state = {}, action){
  switch(action.type){
    case QUESTION_UPDATE:
      return Object.assign({}, state, getUpdatedState(action));

    case ADD_QUESTION:
      return Object.assign({}, state, getUpdatedState(action));

    default:
      return state;
  }
};

export function updateQuestion(question) {
  return {type: QUESTION_UPDATE, question: question};
}

export function addQuestion(question) {
  return {type: ADD_QUESTION, question: question};
}
