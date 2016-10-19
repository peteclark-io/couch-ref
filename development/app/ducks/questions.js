'use strict';

const QUESTION_UPDATE = 'couch-ref/questions/MATCH_UPDATE'
const ADD_QUESTION = 'couch-ref/questions/ADD_MATCH'

export default function reducer(state = {}, action){
  switch(action.type){
    case QUESTION_UPDATE:
      return Object.assign({}, state, {
        [action.question.id]: action.question
      });

    case ADD_QUESTION:
      return Object.assign({}, state, {
        [action.question.id]: action.question
      });

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
