'use strict'

import React from 'react';
import {Link} from 'react-router'

import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import RatedQuestion from '../Common/RatedQuestion';

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
                  <RatedQuestion key={q.id} question={q} />
               );
            })}
         </div>
      );
   }
});

export default MatchQuestionRatings;
