'use strict'

import React from 'react';
import {Link} from 'react-router'

import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import RatedQuestion from '../Common/RatedQuestion';

import {inflation} from '../../core/magic';
import styles from './styles.css';

const MatchQuestionRatings = React.createClass({

   propTypes: {
      questions: React.PropTypes.array
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
      if (!this.props.questions){
         return null;
      }

      var mapped = this.props.questions.map(q => {
         return !q || !q.refereeScore ? undefined : q;
      }).filter(q => q);

      return (
         <div className={styles['question-scores']}>
            <h1 className={styles.heading}>Referee's Scores</h1>
            {mapped.map(q => {
               return (
                  <RatedQuestion prefix={`Ref's`} key={q.id} question={q} score={q.refereeScore} answer={q.decision} />
               );
            })}
         </div>
      );
   }
});

export default MatchQuestionRatings;
