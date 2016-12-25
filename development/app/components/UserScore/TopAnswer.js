'use strict'

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import styles from './styles.css';

export const TopAnswer = React.createClass({

   propTypes: {
      user: React.PropTypes.object,
      best: React.PropTypes.object,
      worst: React.PropTypes.object
   },

   sign: (val) => {
      return val > 0 ? '+' : null;
   },

   bground: (val) => {
      return val >= 0 ? styles.green : styles.red;
   },

   render: function() {
      if (!this.props.user || !this.props.best || !this.props.worst){
         return null;
      }

      var bestScore = this.props.user.best.score;
      var worstScore = this.props.user.worst.score;

      return (
         <div>
            <div className={classNames(bootstrap.row, styles['top-answer'])}>
               <div className={bootstrap['col-xs-12']}>
                  <h1 className={styles.heading}>Best Answer</h1>
               </div>

               <div className={classNames(bootstrap['col-xs-2'], bootstrap['col-sm-2'], bootstrap['col-md-2'], bootstrap['col-lg-1'])}>
                  <p className={classNames(styles.score, this.bground(bestScore))}>{this.sign(bestScore)}{(bestScore * 10).toFixed(0)}</p>
               </div>
               <div className={classNames(bootstrap['col-xs-10'], bootstrap['col-sm-10'], bootstrap['col-md-10'], bootstrap['col-lg-11'])}>
                  <h3>{this.props.best.question}</h3>
                  <h3><small>{this.props.best.description}</small></h3>
                  <Link className={styles.link} to={`/question/${this.props.best.id}`}>Show Detailed Results</Link>
               </div>
            </div>

            <div className={classNames(bootstrap.row, styles['top-answer'])}>
               <div className={bootstrap['col-xs-12']}>
                  <h1 className={styles.heading}>Worst Answer</h1>
               </div>

               <div className={classNames(bootstrap['col-xs-2'], bootstrap['col-sm-2'], bootstrap['col-md-2'], bootstrap['col-lg-1'])}>
                  <p className={classNames(styles.score, this.bground(worstScore))}>{this.sign(worstScore)}{(worstScore * 10).toFixed(0)}</p>
               </div>
               <div className={classNames(bootstrap['col-xs-10'], bootstrap['col-sm-10'], bootstrap['col-md-10'], bootstrap['col-lg-11'])}>
                  <h3>{this.props.worst.question}</h3>
                  <h3><small>{this.props.worst.description}</small></h3>
                  <Link className={styles.link} to={`/question/${this.props.worst.id}`}>Show Detailed Results</Link>
               </div>
            </div>
         </div>
      );
   }
});

export default TopAnswer;
