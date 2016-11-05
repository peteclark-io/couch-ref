'use strict';

const VOTE = 'couch-ref/user/VOTE';
const SELECT_CLUB = 'couch-ref/user/SELECT_CLUB';

const INSPECT_COOKIES = 'couch-ref/user/INSPECT_COOKIES';
const INSPECT_FIREBASE = 'couch-ref/user/INSPECT_FIREBASE';

export default function reducer(state = {}, action){
  switch(action.type){
    case VOTE:
      return Object.assign({}, state, {
         votes: Object.assign({}, state.votes, {
            [action.question.id]: {
               result: action.vote
            }
         })
      });

    case SELECT_CLUB:
      return Object.assign({}, state, {
         club: Object.assign({}, state.club, action.club)
      });

    case INSPECT_COOKIES:
      return Object.assign({}, state, {
         club: Object.assign({}, state.club, action.cookies.club),
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

export function selectClub(club) {
  return {type: SELECT_CLUB, club: club};
}

export function vote(question, vote) {
  return {type: VOTE, question: question, vote: vote};
}

export function inspectCookies(cookies) {
  return {type: INSPECT_COOKIES, cookies: cookies};
}

export function inspectFirebase(user) {
  return {type: INSPECT_FIREBASE, user: user};
}
