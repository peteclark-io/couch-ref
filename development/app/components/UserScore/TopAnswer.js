'use strict'

import React from 'react';
import {connect} from 'react-redux'
import classNames from 'classnames';

import styles from './styles.css';

export const TopAnswer = React.createClass({

   propTypes: {
      max: React.PropTypes.object,
      min: React.PropTypes.object
   },

   render: function() {
      return (
         <div>
            <div className={classNames(styles.container, styles.answered)}>
               <h1 className={styles.heading}>Best Answer</h1>
               <h2 className={styles.value}>{this.props.max.score.toFixed(0)}</h2>
            </div>
            <div className={classNames(styles.container, styles.answered)}>
               <h1 className={styles.heading}>Worst Answer</h1>
               <h2 className={styles.value}>{this.props.min.score.toFixed(0)}</h2>
            </div>
         </div>
      );
   }
});

const getTopScores = (state = {user: {}}) => {
   var max = {score: -1000};
   var min = {score: 1000};

   if (state.user.votes){
      var uuids = Object.keys(state.user.votes)
      uuids.map(uuid => {
         if (state.user.votes[uuid].score > max.score){
            max = Object.assign({}, state.user.votes[uuid]);
            max.question = uuid;
         }

         if (state.user.votes[uuid].score < min.score){
            min = Object.assign({}, state.user.votes[uuid]);
            min.question = uuid;
         }
      });
   }
   return {max: max, min: min};
};

const getTopQuestions = (state = {questions: {}}) => {

};

const mapStateToProps = (state) => {
   var results = getTopScores(state);
   return {
      max: results.max,
      min: results.min
   }
}

const LiveTopAnswer = connect(
   mapStateToProps
)(TopAnswer)

export default LiveTopAnswer
