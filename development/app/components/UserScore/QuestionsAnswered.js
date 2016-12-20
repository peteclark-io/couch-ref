'use strict'

import React from 'react';

import classNames from 'classnames';
import styles from './styles.css';

const QuestionsAnswered = React.createClass({

   propTypes: {
      score: React.PropTypes.number,
      answered: React.PropTypes.number
   },

   render: function() {
      return (
         <div>
            <div className={classNames(styles.container, styles.answered)}>
               <h1 className={styles.heading}>Total Questions Answered</h1>
               <h2 className={styles.value}>{this.props.answered.toFixed(0)}</h2>
            </div>
            <div className={classNames(styles.container, styles.answered)}>
               <h1 className={styles.heading}>CouchRef Score</h1>
               <h2 className={styles.value}>{this.props.score.toFixed(0)}</h2>
            </div>
         </div>
      );
   }
});

export default QuestionsAnswered;
