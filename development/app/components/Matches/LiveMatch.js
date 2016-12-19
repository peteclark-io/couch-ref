'use strict';

import { connect } from 'react-redux';
import Match from './Match';
import _ from 'lodash';

const getLiveMatch = (state = {matches: []}, id) => {
   var filtered = _.filter(state.matches, {id: id});
   return filtered.length === 0 ? undefined : filtered[0];
};

const getScoresReady = (match, state = {votes: {}}) => {
   if (!match) {
      return false;
   }
   
   var scores = match.questions.map((q) => {
      if (!state.user.votes[q.id]){
         return undefined;
      }

      var answer = state.user.votes[q.id];
      return answer ? answer.score : undefined;
   }).filter((s) => {return s;});

   return scores.length !== 0;
};

const mapStateToProps = (state, ownProps) => {
   var match = getLiveMatch(state, ownProps.id);
   return {
      match: match,
      scoresReady: getScoresReady(match, state)
   };
};

const LiveMatch = connect(
   mapStateToProps
)(Match);

export default LiveMatch;
