'use strict';

const VOTE = 'couch-ref/votes/VOTE';

const updatedState = function(action){
  var update = {};
  update[action.question.id] = action.vote;
  return update;
};

export default function reducer(state = {}, action){
  switch(action.type){
    case VOTE:
      return Object.assign({}, state, updatedState(action));

    default:
      return state;
  }
};

export function vote(question, vote) {
  return {type: VOTE, question: question, vote: vote};
}
