'use strict'

import React from 'react';
import {connect} from 'react-redux'
import classNames from 'classnames';

import styles from './styles.css';

export const Score = React.createClass({

   propTypes: {
      rank: React.PropTypes.number,
      movement: React.PropTypes.number
   },

   render: function() {
      return (
         <div className={classNames(styles.container, styles.centred)}>
            <h1 className={styles.heading}>Your Ranking!</h1>
            <h2 className={styles.score}>#{this.props.rank ? this.props.rank : 'Unranked!'}</h2>
         </div>
      );
   }
});

const getRank = (state = {user: {}}) => {
   return state.user.rank;
};

const getMovement = (state = {user: {}}) => {
   return state.user.movement;
};

const mapStateToProps = (state) => {
   return {
      rank: getRank(state),
      movement: getMovement(state)
   }
};

const LiveScore = connect(
   mapStateToProps
)(Score);

export default LiveScore;
