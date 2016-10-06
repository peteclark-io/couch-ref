'use strict';

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './styles.css';

const Question = React.createClass({

   propTypes: {
      question: React.PropTypes.string,
      time: React.PropTypes.string,
      type: React.PropTypes.string,
      number: React.PropTypes.number
   },

   render: function() {
      return (
         <div className={styles.question}>
            <div className={bootstrap.row}>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-md-2'])}>
                  <h2><small>{this.props.time}</small></h2>
               </div>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-md-10'])}>
                  <h2>{this.props.question}</h2>
                  <div className={styles.spacer}></div>
                  <a className={classNames(styles['action-button'], styles.green, styles.animate)}>Yes</a>
                  <a className={classNames(styles['action-button'], styles.red, styles.animate)}>No</a>
               </div>
            </div>
         </div>
      );
   }
});

/*
<div className={classNames(bootstrap.row, styles['question-buttons'])}>
   <div className={bootstrap['col-xs-6']}>
        <a className={classNames(styles['action-button'], styles.green, styles.animate)}>Yes</a>
        <a className={classNames(styles['action-button'], styles.red, styles.animate)}>No</a>
   </div>
</div>
*/

export default Question;
