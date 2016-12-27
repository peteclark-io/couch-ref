'use strict'

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import RatedQuestion from '../Common/RatedQuestion';

import {inflation} from '../../core/magic';
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

      var best = this.props.best;
      var worst = this.props.worst;

      return (
         <div>
            <div className={classNames(bootstrap.row, styles['top-answer'])}>
               <div className={bootstrap['col-xs-12']}>
                  <h1 className={styles.heading}>Best Answer</h1>
                  <RatedQuestion question={best} score={this.props.user.best.score} />
               </div>
            </div>

            <div className={classNames(bootstrap.row, styles['top-answer'])}>
               <div className={bootstrap['col-xs-12']}>
                  <h1 className={styles.heading}>Worst Answer</h1>
                  <RatedQuestion question={worst} score={this.props.user.worst.score} />
               </div>
            </div>
         </div>
      );
   }
});

export default TopAnswer;
