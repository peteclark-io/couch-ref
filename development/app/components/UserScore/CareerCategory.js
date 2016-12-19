'use strict'

import React from 'react';
import {connect} from 'react-redux'
import classNames from 'classnames';

import {overallScore} from '../../core/scores';
import styles from './styles.css';

export const CareerCategory = React.createClass({

   propTypes: {
      answered: React.PropTypes.number,
      score: React.PropTypes.number
   },

   render: function() {
      var career = overallScore(this.props.answered, this.props.score);

      return (
         <div className={classNames(styles.container, styles.ranking)}>
            <h1 className={styles.heading}>{career}</h1>
         </div>
      );
   }
});

const getAnswered = (state = {user: {}}) => {
   return state.user.answered ? state.user.answered : 0;
};

const getScore = (state = {user: {}}) => {
   return state.user.score ? state.user.score : 2000;
};

const mapStateToProps = (state) => {
   return {
      answered: getAnswered(state),
      score: getScore(state)
   }
};

const LiveCareerCategory = connect(
   mapStateToProps
)(CareerCategory);

export default LiveCareerCategory;
