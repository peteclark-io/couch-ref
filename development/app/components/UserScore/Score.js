'use strict'

import React from 'react';
import {connect} from 'react-redux'
import classNames from 'classnames';

import styles from './styles.css';

export const Score = React.createClass({

   propTypes: {
      score: React.PropTypes.number
   },

   render: function() {
      return (
         <div className={classNames(styles.container, styles.centred)}>
            <h1 className={styles.heading}>Your Score!</h1>
            <h2 className={styles.score}>{this.props.score.toFixed(0)}</h2>
         </div>
      );
   }
});

const getScore = (state = {user: {}}) => {
   return state.user.score ? state.user.score : 2000;
};

const mapStateToProps = (state) => {
   return {
      score: getScore(state)
   }
};

const LiveScore = connect(
   mapStateToProps
)(Score);

export default LiveScore;
