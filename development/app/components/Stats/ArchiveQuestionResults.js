'use strict';

import _ from 'lodash';
import QuestionResults from './QuestionResults';

import {connect} from 'react-redux';

const getQuestion = (state = {archive: {questions: {}}}, id) => {
   if (!state.archive.questions){
      return {};
   }

   return state.archive.questions[id] ? state.archive.questions[id] : {};
};

const getClubs = (state = {clubs: []}) => {
  return state.clubs.map((c) => c.shortName);
};

const getQuestionResults = (state = {archive: {statistics: {}}}, id) => {
   if (!state.archive.statistics){
      return {id: id, breakdown: {club: {}}, simple: {yes: 0, no: 0}};
   }

   return state.archive.statistics[id] ? state.archive.statistics[id] : {id: id, breakdown: {club: {}}, simple: {yes: 0, no: 0}};
};

const getMatch = (state = {archive: {questions: {}, matches: {}}}, id) => {
   if (!state.archive.questions || !state.archive.questions[id]){
      return undefined;
   }

   var question = state.archive.questions[id];
   if (!question.match){
      return undefined;
   }

   if (!state.archive.matches[question.match]){
      return undefined;
   }

   var match = state.archive.matches[question.match];
   return {home: match.home, away: match.away}
};

const mapStateToProps = (state, ownProps) => {
   return {
      results: getQuestionResults(state, ownProps.id),
      match: getMatch(state, ownProps.id),
      question: getQuestion(state, ownProps.id),
      clubs: getClubs(state)
   };
};

const ArchiveQuestionResults = connect(
   mapStateToProps
)(QuestionResults);

export default ArchiveQuestionResults;
