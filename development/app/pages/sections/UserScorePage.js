'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import _ from 'lodash';

import Ranking from '../../components/UserScore/Ranking';
import RecentMatches from '../../components/UserScore/RecentMatches';
import QuestionsAnswered from '../../components/UserScore/QuestionsAnswered';

import styles from './styles.css';

const UserScorePage = React.createClass({

   propTypes: {
      score: React.PropTypes.number,
      answered: React.PropTypes.number,
      rank: React.PropTypes.number,
      movement: React.PropTypes.number,
      recentMatches: React.PropTypes.object,
      recentMatchScores: React.PropTypes.object
   },

   render: function() {
      return (
         <div>
            <Ranking rank={this.props.rank} movement={this.props.movement} />
            <Link className={styles.link} to={`/`}>See Upcoming Fixtures.</Link>
            <RecentMatches matches={this.props.recentMatches} scores={this.props.recentMatchScores} />
            <QuestionsAnswered score={this.props.score} answered={this.props.answered} />
         </div>
      );
   }
});

const getRecentMatches = (state = {user: {}, questions: {}, matches: []}) => {
   if (!state.user.votes || !state.questions || !state.matches){
      return undefined;
   }

   var matchState = _.keyBy(state.matches, 'id');  // change matches to a fucking map

   var matches = Object.keys(state.user.votes).map((vote) => {
      return state.questions[vote] && state.questions[vote].scored ? state.questions[vote] : undefined;
   }).filter(q => q).map(q => {
      return matchState[q.match] ? matchState[q.match] : undefined;
   }).filter(m => m);

   return _.keyBy(_.uniqBy(matches, 'id'), 'id');
};

const getMatchScores = (state = {user: {}}, recentMatches) => {
   if (!state.user.votes) {
      return undefined;
   }

   var recentKeys = Object.keys(recentMatches);

   var scores = recentKeys.map(id => {
      return recentMatches[id].questions;
   }).map(qs => {
      return qs.map(q => {
         return state.user.votes[q.id] ? state.user.votes[q.id] : undefined;
      }).filter(q => q && q.score !== 0);
   });

   var result = {};
   for (var i = 0 ; i < recentKeys.length ; i++){
      Object.assign(result, {
         [recentKeys[i]]: scores[i]
      });
   }

   return result;
};

const getAnswered = (state = {user: {}}) => {
   return state.user.answered ? state.user.answered : 0;
};

const getScore = (state = {user: {}}) => {
   return state.user.score ? state.user.score : 2000;
};

const getRank = (state = {user: {}}) => {
   return state.user.rank;
};

const getMovement = (state = {user: {}}) => {
   return state.user.movement;
};

const mapStateToProps = (state) => {
   var recentMatches = getRecentMatches(state);
   return {
      recentMatches: recentMatches,
      recentMatchScores: getMatchScores(state, recentMatches),
      answered: getAnswered(state),
      rank: getRank(state),
      movement: getMovement(state),
      score: getScore(state)
   }
};

const LiveUserScorePage = connect(
   mapStateToProps
)(UserScorePage);

export default LiveUserScorePage;
