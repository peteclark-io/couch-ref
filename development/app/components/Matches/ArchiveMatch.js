'use strict';

import { connect } from 'react-redux';
import Match from './Match';
import _ from 'lodash';

const getArchiveMatch = (state = {archive: {matches: {}}}, id) => {
   if (!state.archive || !state.archive.matches || !state.archive.matches[id]){
      return undefined;
   }

   return state.archive.matches[id];
};

const getScoresReady = (match, state = {user: {votes: {}}}) => {
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

const getQuestions = (state = {archive: {questions: {}}}, match) => {
   if (!state.archive.questions){
      return {};
   }

   var reduced = match.questions.map(q => {
      return state.archive.questions[q.id] ? state.archive.questions[q.id] : undefined;
   }).filter(q => q);

   return _.keyBy(reduced, 'id');
};

const getStatistics = (state = {archive: {statistics: {}}}, match) => {
   if (!state.archive.statistics){
      return {};
   }

   var reduced = match.questions.map(q => {
      return state.archive.statistics[q.id] ? state.archive.statistics[q.id] : undefined;
   }).filter(q => q);

   return _.keyBy(reduced, 'id');
};

const getUser = (state = {user: {}}) => {
   return state.user;
};

const mapStateToProps = (state, ownProps) => {
   var match = getArchiveMatch(state, ownProps.id);
   return {
      archive: true,
      match: match,
      questions: getQuestions(state, match),
      statistics: getStatistics(state, match),
      user: getUser(state),
      scoresReady: false
   };
};

const ArchiveMatch = connect(
   mapStateToProps
)(Match);

export default ArchiveMatch;
