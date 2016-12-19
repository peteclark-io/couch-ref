'use strict'

import React from 'react';
import {connect} from 'react-redux';

import _ from 'lodash';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import {matchScore} from '../../core/scores';
import styles from './styles.css';

export const MatchRating = React.createClass({

   propTypes: {
      user: React.PropTypes.object,
      match: React.PropTypes.object
   },

   render: function() {
      if (!this.props.match || !this.props.user || !this.props.user.votes){
         return null;
      }

      var scores = this.props.match.questions.map((q) => {
         if (!this.props.user.votes[q.id]){
            return undefined;
         }

         var answer = this.props.user.votes[q.id];
         return answer ? answer.score : undefined;
      }).filter((s) => {return s;});

      if(scores.length === 0){
         return null;
      }

      var overall = _.sum(scores) * 100;
      console.log('Score for the match', overall, scores);
      var title = matchScore(overall);

      return (
         <div className={styles['match-rating']}>
            <h3>Overall Match Rating</h3>
            <h2>{overall.toFixed(0)}</h2>
         </div>
      );
   }
});

const getUser = (state = {user: {}}) => {
   return state.user;
};

const getLiveMatch = (state = {matches: []}, id) => {
   var filtered = _.filter(state.matches, {id: id});
   return filtered.length === 0 ? undefined : filtered[0];
};

const mapStateToProps = (state, ownProps) => {
   return {
      user: getUser(state, ownProps.id),
      match: getLiveMatch(state, ownProps.id)
   };
};

const LiveMatchRating = connect(
   mapStateToProps
)(MatchRating);

export default LiveMatchRating;
