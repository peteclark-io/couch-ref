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
                  <h3><small>{this.props.time}</small></h3>
               </div>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-md-10'])}>
                  <h3>{this.props.question}</h3>
                  <div className={styles.spacer}></div>
                  <a className={classNames(styles['action-button'], styles.green, styles.animate)}>Yes</a>
                  <a className={classNames(styles['action-button'], styles.red, styles.animate)}>No</a>
               </div>
            </div>
         </div>
      );
   }
});

export default Question;
