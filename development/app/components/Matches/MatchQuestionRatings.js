'use strict'

import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'

import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {inflation} from '../../core/magic';
import styles from './ratings.css';

const MatchQuestionRatings = React.createClass({

   propTypes: {
      questions: React.PropTypes.array,
      user: React.PropTypes.object
   },

   sign: (val) => {
      if (val > 0){
         return '+';
      }
      return null;
   },

   bground: (val) => {
      return val >= 0 ? styles.green : styles.red;
   },

   render: function() {
      if (!this.props.user || !this.props.user.votes || !this.props.questions){
         return null;
      }

      var mapped = this.props.questions.map(q => {
         if (!q.scored || !this.props.user.votes[q.id]){
            return undefined;
         }

         var answer = this.props.user.votes[q.id];
         return Object.assign({}, answer, q);
      }).filter(q => q);

      return (
         <div className={styles['question-scores']}>
            <h1 className={styles.header}>Scores</h1>
            {mapped.map(q => {
               return (
                  <div className={classNames(bootstrap.row, styles.question)} key={q.id}>
                     <div className={classNames(bootstrap['col-xs-2'], bootstrap['col-sm-2'], bootstrap['col-md-2'], bootstrap['col-lg-1'])}>
                        <p className={classNames(styles.score, this.bground(q.score))}>{this.sign(q.score)}{(q.score * inflation).toFixed(0)}</p>
                     </div>
                     <div className={classNames(bootstrap['col-xs-10'], bootstrap['col-sm-10'], bootstrap['col-md-10'], bootstrap['col-lg-11'])}>
                        <h3>{q.question}</h3>
                        <h3><small>{q.description}</small></h3>
                        <h4 className={styles.answer}>Your Answer: <span>{q.answer}</span></h4>
                        <Link className={styles.link} to={`/question/${q.id}`}>Show Detailed Results</Link>
                     </div>
                  </div>
               );
            })}
         </div>
      );
   }
});

export default MatchQuestionRatings;
