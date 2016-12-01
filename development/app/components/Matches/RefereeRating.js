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
      match: React.PropTypes.object,
      referee: React.PropTypes.object
   },

   render: function() {
      if (!this.props.match || !this.props.referee){
         return null;
      }

      var overall = this.props.referee.scores[this.props.match.id];
      console.log('Ref score for the match', overall)
      var title = matchScore(overall);

      return (
         <div className={styles['ref-rating']}>
            <h3>Referee Rating</h3>
            <h2>{title}</h2>
         </div>
      );
   }
});

const getLiveMatch = (state = {matches: []}, id) => {
   var filtered = _.filter(state.matches, {id: id});
   return filtered.length === 0 ? undefined : filtered[0];
};

const getReferee = (match, state = {referees: {}}) => {
   var ref = state.referees[match.referee];
   return ref ? ref : undefined;
};

const mapStateToProps = (state, ownProps) => {
   var match = getLiveMatch(state, ownProps.id);
   return {
      match: match,
      referee: getReferee(match, state)
   };
};

const LiveRefereeRating = connect(
   mapStateToProps
)(RefereeRating);

export default LiveRefereeRating;
