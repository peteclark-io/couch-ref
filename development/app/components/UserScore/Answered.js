'use strict'

import React from 'react';
import {connect} from 'react-redux'
import classNames from 'classnames';

import styles from './styles.css';

export const Answered = React.createClass({

   propTypes: {
      answered: React.PropTypes.number
   },

   render: function() {
      return (
         <div className={classNames(styles.container, styles.answered)}>
            <h1 className={styles.heading}>Questions Answered</h1>
            <h2 className={styles.value}>{this.props.answered.toFixed(0)}</h2>
         </div>
      );
   }
});

const getAnswered = (state = {user: {}}) => {
   return state.user.answered ? state.user.answered : 0;
}

const mapStateToProps = (state) => {
   return {
      answered: getAnswered(state)
   }
}

const LiveAnswered = connect(
   mapStateToProps
)(Answered)

export default LiveAnswered
