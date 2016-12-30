'use strict';

import firebase from 'firebase';
import _ from 'lodash';
import references from '../core/references';

import {loadArchivedMatch} from './matches';
import {createVotes} from '../core/mappers';

const VOTE = 'couch-ref/user/VOTE';
const SET_VOTES = 'couch-ref/user/SET_VOTES';

const SELECT_CLUB = 'couch-ref/user/SELECT_CLUB';
const SET_DOB = 'couch-ref/user/SET_DOB';
const SET_SEX = 'couch-ref/user/SET_SEX';
const SET_LOCATION = 'couch-ref/user/SET_LOCATION';

const INSPECT_COOKIES = 'couch-ref/user/INSPECT_COOKIES';
const INSPECT_FIREBASE = 'couch-ref/user/INSPECT_FIREBASE';

const ADD_REMOTE_FIELDS = 'couch-ref/user/ADD_REMOTE_FIELDS';

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

      case ADD_REMOTE_FIELDS:
      return Object.assign({}, state, {
         answered: action.user.answered,
         score: action.user.score,
         rank: action.user.rank,
         movement: action.user.movement,
         recentMatches: action.user.recentMatches,
         best: action.user.best,
         worst: action.user.worst
      })

      case SELECT_CLUB:
      return Object.assign({}, state, {
         club: Object.assign({}, action.club)
      });

      case SET_DOB:
      return Object.assign({}, state, {
         birthday: action.birthday
      });

      case SET_SEX:
      return Object.assign({}, state, {
         sex: action.sex
      });

      case SET_LOCATION:
      return Object.assign({}, state, {
         location: action.location
      });

      case SET_VOTES:
      return Object.assign({}, state, {
         votes: Object.assign({}, state.votes, action.votes)
      });

      case INSPECT_COOKIES:
      return Object.assign({}, state, {
         club: Object.assign({}, state.club, action.cookies.club),
         votes: Object.assign({}, state.votes, action.cookies.votes)
      });

      case INSPECT_FIREBASE:
      return Object.assign({}, state, {
         club: Object.assign({}, state.club, action.user.club),
         remote: Object.assign({}, state.remote, action.user.remote)
      });
      default:
      return state;
   }
};

export function addRemoteFields(user) {
   return (dispatch) => {
      dispatch({type: ADD_REMOTE_FIELDS, user: user});
      user.recentMatches.map(id => {
         dispatch(loadArchivedMatch(id));
      });
   };
}

export function selectClub(club) {
   return {type: SELECT_CLUB, club: club};
}

export function setDateOfBirth(birthday) {
   return {type: SET_DOB, birthday: birthday};
}

export function setSex(sex) {
   return {type: SET_SEX, sex: sex};
}

export function setLocation(location) {
   return {type: SET_LOCATION, location: location};
}

export function vote(question, vote) {
   return {type: VOTE, question: question, vote: vote};
}

export function loadVote(vote) {
   return (dispatch, getState) => {
      var uid = getState().user.remote.uid;
      if (!uid){
         console.error('Cannot load vote yet, no uid...');
         return;
      }

      var db = firebase.database();
      db.ref(references.answers + '/' + uid + '/' + vote).once('value').then(snap => {
         if (!snap.exists()){
            return;
         }

         dispatch(setVotes(createVotes({[vote]: snap.val()})));
      });
   };
}

export function setVotes(votes) {
   return {type: SET_VOTES, votes: votes};
}

export function inspectCookies(cookies) {
   return {type: INSPECT_COOKIES, cookies: cookies};
}

export function inspectFirebase(user) {
   return {type: INSPECT_FIREBASE, user: user};
}
