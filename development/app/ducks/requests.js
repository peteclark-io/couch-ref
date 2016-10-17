'use strict'

const SUBSCRIBE_TO_STATISTICS = 'couch-ref/requests/SUBSCRIBE_TO_STATISTICS'
const UNSUBSCRIBE_FROM_STATISTICS = 'couch-ref/requests/UNSUBSCRIBE_FROM_STATISTICS'

export default function reducer(state = [], action){
  switch(action.type){
    case SUBSCRIBE_TO_STATISTICS:
      return [...state, action.request];
    case UNSUBSCRIBE_FROM_STATISTICS:
      return [...state, action.request];
    default:
      return state;
  }
};

export function subscribeToStatistics(question) {
  return {type: SUBSCRIBE_TO_STATISTICS, request: {id: question.id, type: "SUBSCRIBE"}};
}

export function unsubscribeFromStatistics(question) {
  return {type: UNSUBSCRIBE_FROM_STATISTICS, request: {id: question.id, type: "UNSUBSCRIBE"}};
}
