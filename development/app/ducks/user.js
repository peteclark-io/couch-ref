'use strict';

const VOTE = 'couch-ref/user/VOTE';
const INSPECT_COOKIES = 'couch-ref/user/INSPECT_COOKIES';
const INSPECT_FIREBASE = 'couch-ref/user/INSPECT_FIREBASE';

export default function reducer(state = {}, action){
  switch(action.type){
    case VOTE:
      return Object.assign({}, state, {
         votes: Object.assign({}, state.votes, {
            [action.question.id]: action.vote
         })
      });

    case INSPECT_COOKIES:
      return Object.assign({}, state, {
         local: {
            votes: action.cookies.votes
         }
      });

    case INSPECT_FIREBASE:
      return Object.assign({}, state, {
         remote: {
            uid: action.user.uid,
            fullName: action.user.fullName
         }
      });
    default:
      return state;
  }
};

export function vote(question, vote) {
  return {type: VOTE, question: question, vote: vote};
}

export function inspectCookies(cookies) {
  return {type: INSPECT_COOKIES, cookies: cookies};
}

export function inspectFirebase(user) {
  return {type: INSPECT_FIREBASE, user: user};
}
