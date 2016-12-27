'use strict'

import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import _ from 'lodash';

import styles from './styles.css';

import MatchHeader from '../../components/Matches/MatchHeader';
import Referee from '../../components/Matches/Referee';
import MatchRating from '../../components/Matches/MatchRating';
import MatchQuestionRatings from '../../components/Referees/MatchQuestionRatings';

export const RefereeMatchRatingPage = React.createClass({

   propTypes: {
      match: React.PropTypes.object,
      referee: React.PropTypes.object,
      questions: React.PropTypes.array
   },

   render: function() {
      var score = this.props.referee.scores[this.props.match.id];

      return (
         <div>
            <MatchHeader match={this.props.match} />
            <Referee referee={this.props.referee} />
            <MatchRating score={score} />
            <Link className={styles.link} to={`/match/${this.props.match.id}`}>Explore Questions and Results.</Link>
            <MatchQuestionRatings questions={this.props.questions} />
         </div>
      );
   }
});

const getReferee = (state = {referees: {}}, match) => {
   if (!match){
      return undefined;
   }

   var ref = state.referees[match.referee];
   return ref ? ref : undefined;
};

const getLiveMatch = (state = {matches: {}}, id) => {
   return state.matches[id];
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
      referee: getReferee(state, match),
      questions: getMatchQuestions(match, state)
   };
};

const LiveRefereeMatchRatingPage = connect(
   mapStateToProps
)(RefereeMatchRatingPage);

export default LiveRefereeMatchRatingPage;
