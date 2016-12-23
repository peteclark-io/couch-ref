'use strict';

import {connect} from 'react-redux';
import QuestionResults from './QuestionResults';

const getQuestion = (state = {questions: {}}, id) => {
   return state.questions[id] ? state.questions[id] : {};
};

const getClubs = (state = {clubs: []}) => {
  return state.clubs.map((c) => c.shortName);
};

const getQuestionResults = (state = {statistics: {}}, id) => {
   return state.statistics[id] ? state.statistics[id] : {id: id, breakdown: {club: {}}, simple: {yes: 0, no: 0}};
};

const getMatch = (state = {questions: {}, matches: {}}, id) => {
   if (!state.questions || !state.questions[id]){
      return undefined;
   }

   var question = state.questions[id];
   if (!question.match){
      return undefined;
   }

   if (!state.matches || !state.matches[question.match]){
      return undefined;
   }

   var match = state.matches[question.match];
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

const LiveQuestionResults = connect(
   mapStateToProps
)(QuestionResults);

export default LiveQuestionResults;
