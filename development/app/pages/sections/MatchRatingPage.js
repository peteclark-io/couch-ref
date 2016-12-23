'use strict'

import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import _ from 'lodash';

import styles from './styles.css';

import MatchHeader from '../../components/Matches/MatchHeader';
import MatchRating from '../../components/Matches/MatchRating';
import MatchQuestionRatings from '../../components/Matches/MatchQuestionRatings';

export const MatchRatingPage = React.createClass({

   propTypes: {
      match: React.PropTypes.object,
      questions: React.PropTypes.array,
      user: React.PropTypes.object
   },

   render: function() {
      return (
         <div>
            <MatchHeader match={this.props.match} />
            <MatchRating match={this.props.match} user={this.props.user} />
            <Link className={styles.link} to={`/match/${this.props.match.id}`}>Explore Questions and Results.</Link>
            <MatchQuestionRatings questions={this.props.questions} user={this.props.user} />
         </div>
      );
   }
});

const getLiveMatch = (state = {matches: []}, id) => {
   var filtered = _.filter(state.matches, {id: id});
   return filtered.length === 0 ? undefined : filtered[0];
};

const getMatchQuestions = (match, state = {questions: {}}) => {
   if (!match.questions){
      return undefined;
   }

   return match.questions.map(q => {
      return state.questions[q.id];
   });
};

const getUser = (state = {user: {}}) => {
   return state.user;
};

const mapStateToProps = (state, ownProps) => {
   var match = getLiveMatch(state, ownProps.params.matchId);
   return {
      match: match,
      questions: getMatchQuestions(match, state),
      user: getUser(state)
   };
};

const LiveMatchRatingPage = connect(
   mapStateToProps
)(MatchRatingPage);

export default LiveMatchRatingPage;
