'use strict'

import React from 'react';
import {connect} from 'react-redux';

import _ from 'lodash';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import {matchScore} from '../../core/scores';
import styles from './styles.css';

const RefereeRating = React.createClass({

   propTypes: {
      user: React.PropTypes.object,
      match: React.PropTypes.object
   },

   render: function() {
      if (!this.props.match){
         return null;
      }

      var scores = this.props.match.questions.map((q) => {
         var answer = this.props.user.votes[q.id];
         if (answer){
            return answer.score;
         }
         return undefined;
      }).filter((s) => {return s;});

      if(scores.length === 0){
         return null;
      }

      var overall = _.sum(scores);
      console.log('Score for the match', overall, scores)
      var normalized = overall / scores.length;
      var title = matchScore(normalized);

      return (
         <div className={styles['match-rating']}>
            <h3>Your Match Rating</h3>
            <h2>{title}</h2>
         </div>
      );
   }
});

const getLiveMatch = (state = {matches: []}, id) => {
   var filtered = _.filter(state.matches, {id: id});
   return filtered.length === 0 ? undefined : filtered[0];
};

const mapStateToProps = (state, ownProps) => {
   return {
      match: getLiveMatch(state, ownProps.id)
   };
};

const LiveRefereeRating = connect(
   mapStateToProps
)(RefereeRating);

export default LiveRefereeRating;