'use strict'

import React from 'react';
import {connect} from 'react-redux'
import classNames from 'classnames';

import {overallScore} from '../../core/scores';
import styles from './styles.css';

export const RefereeCareer = React.createClass({

   propTypes: {
      answered: React.PropTypes.number,
      score: React.PropTypes.number
   },

   render: function() {
      var career = overallScore(this.props.answered, this.props.score);

      return (
         <div>
            <div className={classNames(styles.container, styles.ranking)}>
               <h1 className={styles.subheading}>Your Ranking</h1>
               <h1 className={styles.heading}>{career}</h1>
            </div>
            <div className={classNames(styles.container, styles.answered)}>
               <h1 className={styles.heading}>Questions Answered</h1>
               <h2 className={styles.value}>{this.props.answered.toFixed(0)}</h2>
            </div>
         </div>
      );
   }
});

const getAnswered = (state = {user: {}}) => {
   return state.user.answered ? state.user.answered : 0;
}

const getScore = (state = {user: {}}) => {
   return state.user.score ? state.user.score : 2000;
}

const mapStateToProps = (state) => {
   return {
      answered: getAnswered(state),
      score: getScore(state)
   }
}

const LiveRefereeCareer = connect(
   mapStateToProps
)(RefereeCareer)

export default LiveRefereeCareer
