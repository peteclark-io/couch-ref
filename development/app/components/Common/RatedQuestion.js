'use strict'

import React from 'react';
import {Link} from 'react-router';

import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {inflation} from '../../core/magic';
import styles from './ratings.css';

const RatedQuestion = React.createClass({

   propTypes: {
      question: React.PropTypes.object,
      score: React.PropTypes.number,
      answer: React.PropTypes.string,
      prefix: React.PropTypes.string
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
      var question = this.props.question;
      var score = this.props.score;
      return (
         <div className={classNames(bootstrap.row, styles.question)}>
            <div className={classNames(bootstrap['col-xs-2'], bootstrap['col-sm-2'], bootstrap['col-md-2'], bootstrap['col-lg-1'])}>
               <p className={classNames(styles.score, this.bground(score))}>{this.sign(score)}{(score * inflation).toFixed(0)}</p>
            </div>
            <div className={classNames(bootstrap['col-xs-10'], bootstrap['col-sm-10'], bootstrap['col-md-10'], bootstrap['col-lg-11'])}>
               <h3>{question.question}</h3>
               <h3><small>{question.description}</small></h3>
               {
                  this.props.answer ?
                  <h4 className={styles.answer}>{this.props.prefix ? this.props.prefix : 'Your'} Answer: <span>{this.props.answer}</span></h4>
                  : null
               }
               <Link className={styles.link} to={`/question/${question.id}`}>Show Detailed Results</Link>
            </div>
         </div>
      );
   }
});

export default RatedQuestion;
