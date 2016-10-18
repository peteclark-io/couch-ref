'use strict';

const VOTE = 'couch-ref/user/VOTE';

export default function reducer(state = {}, action){
  switch(action.type){
    case VOTE:
      return Object.assign({}, state, getUpdatedState(action));

    default:
      return state;
  }
};

export function vote(question, vote) {
  return {type: VOTE, question: question, vote: vote};
}
