'use strict'

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
         <div>
            <h3>{this.props.time}</h3>
            <h1>{this.props.question}</h1>
            <div className={bootstrap.row}>
                <div className={bootstrap['col-xs-6']}>
                    <a className={classNames(styles['action-button'], styles.green, styles.animate, styles.shadow)}>Yes</a>
                </div>
                <div className={bootstrap['col-xs-6']}>
                    <a className={classNames(styles['action-button'], styles.red, styles.animate, styles.shadow)}>No</a>
                </div>
            </div>
         </div>
      );
   }
});

export default Question;
