'use strict'

import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import _ from 'lodash';

import styles from './styles.css';

import {inflation} from '../../core/magic';

import MatchHeader from '../../components/Matches/MatchHeader';
import Referee from '../../components/Matches/Referee';
import MatchRating from '../../components/Matches/MatchRating';
import MatchQuestionRatings from '../../components/Matches/MatchQuestionRatings';

export const MatchRatingPage = React.createClass({

   propTypes: {
      match: React.PropTypes.object,
      referee: React.PropTypes.object,
      questions: React.PropTypes.array,
      user: React.PropTypes.object
   },

   computeScore: (match, user) => {
      if (!match || !user || !user.votes){
         return null;
      }

      var scores = match.questions.map((q) => {
         if (!user.votes[q.id]){
            return undefined;
         }

         var answer = user.votes[q.id];
         return answer ? Math.round(answer.score * inflation) : undefined;
      }).filter((s) => {return s;});

      if(scores.length === 0){
         return null;
      }

      return _.sum(scores) / inflation;
   },

   render: function() {
      var score = this.computeScore(this.props.match, this.props.user);

      return (
         <div>
            <MatchHeader match={this.props.match} />
            <Referee referee={this.props.referee} />
            <MatchRating score={score} />
            <Link className={styles.link} to={`/match/${this.props.match.id}`}>Explore Questions and Results.</Link>
            <MatchQuestionRatings questions={this.props.questions} user={this.props.user} />
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
      referee: getReferee(state, match),
      questions: getMatchQuestions(match, state),
      user: getUser(state)
   };
};

const LiveMatchRatingPage = connect(
   mapStateToProps
)(MatchRatingPage);

export default LiveMatchRatingPage;
