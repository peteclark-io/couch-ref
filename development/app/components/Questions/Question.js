'use strict';

import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './styles.css';

const Question = React.createClass({

   propTypes: {
      question: React.PropTypes.shape({
         id: React.PropTypes.string,
         question: React.PropTypes.string,
         controversial: React.PropTypes.bool,
         refereeDecision: React.PropTypes.bool,
         asked: React.PropTypes.string,
         time: React.PropTypes.string,
         description: React.PropTypes.string,
         decision: React.PropTypes.string
      })
   },

   render: function() {
      return (
         <div className={styles.question}>
            {
               this.props.question.controversial ?
               <div className={bootstrap.row}>
                  <div className={bootstrap['col-xs-12']}>
                     <h2 className={styles.controversy}>Controversial Decision!</h2>
                  </div>
               </div>
               : null
            }

            {
               this.props.question.refereeDecision && !this.props.question.controversial ?
               <div className={bootstrap.row}>
                  <div className={bootstrap['col-xs-12']}>
                     <h2 className={styles['referee-decision']}>Decision!</h2>
                  </div>
               </div>
               : null
            }

            <div className={bootstrap.row}>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-2'])}>
                  <h3><small>{this.props.question.time}</small></h3>
               </div>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-10'])}>
                  <Link className={styles.link} to={`/question/${this.props.question.id}`}><h3>{this.props.question.question}</h3></Link>
                  {/*
                  <div className={styles.spacer}></div>
                  <a className={classNames(styles['action-button'], styles.blue, styles.animate)}>Yes</a>
                  <a className={classNames(styles['action-button'], styles.red, styles.animate)}>No</a>
                  */}
               </div>
            </div>
         </div>
      );
   }
});

export default Question;
