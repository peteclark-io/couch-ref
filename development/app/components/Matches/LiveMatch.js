'use strict';

import { connect } from 'react-redux';
import _ from 'lodash';

import {vote} from '../../ducks/user';
import {saveVote} from '../../core/db-actions';
import {saveVoteAsCookie} from '../../core/cookies';

import Match from './Match';

const getLiveMatch = (state = {matches: {}}, id) => {
   return !state.matches || !state.matches[id] ? undefined : state.matches[id];
};

const getScoresReady = (state = {user: {votes: {}}}, match) => {
   if (!match) {
      return false;
   }

   var scores = match.questions.map((q) => {
      if (!state.user.votes || !state.user.votes[q.id]){
         return undefined;
      }

      var answer = state.user.votes[q.id];
      return answer ? answer.score : undefined;
   }).filter((s) => {return s;});

   return scores.length !== 0;
};

const getQuestions = (state = {questions: {}}, match) => {
   if (!state.questions || !match){
      return undefined;
   }

   var reduced = match.questions.map(q => {
      return state.questions[q.id] ? state.questions[q.id] : undefined;
   }).filter(q => q);

   if (reduced.length === 0){
      return undefined;
   }

   return _.keyBy(reduced, 'id');
};

const getUser = (state = {user: {}}) => {
   return state.user;
};

const getStatistics = (state = {statistics: {}}, match) => {
   if (!state.statistics || !match){
      return undefined;
   }

   var reduced = match.questions.map(q => {
      return state.statistics[q.id] ? state.statistics[q.id] : undefined;
   }).filter(q => q);

   if (reduced.length === 0){
      return undefined;
   }

   return _.keyBy(reduced, 'id');
};

const getReferee = (state = {referees: {}}, match) => {
   if (!match){
      return undefined;
   }

   var ref = state.referees[match.referee];
   return ref ? ref : undefined;
};

const mapStateToProps = (state, ownProps) => {
   var match = getLiveMatch(state, ownProps.id);
   return {
      match: match,
      questions: getQuestions(state, match),
      statistics: getStatistics(state, match),
      referee: getReferee(state, match),
      scoresReady: getScoresReady(state, match),
      user: getUser(state)
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      vote: (result, question, user) => {
         saveVote(user, question, result);
         saveVoteAsCookie(user, question, result);
         dispatch(vote(question, result));
      }
   }
};

const LiveMatch = connect(
   mapStateToProps,
   mapDispatchToProps
)(Match);

export default LiveMatch;
