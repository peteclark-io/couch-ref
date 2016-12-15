'use strict'

import React from 'react';
import {connect} from 'react-redux'
import classNames from 'classnames';

import styles from './styles.css';

export const YesNoRatio = React.createClass({

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

};

const mapStateToProps = (state) => {
   return {
      score: getScore(state)
   }
};

const LiveYesNoRatio = connect(
   mapStateToProps
)(YesNoRatio);

export default LiveYesNoRatio;
