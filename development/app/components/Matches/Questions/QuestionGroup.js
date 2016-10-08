'use strict';

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './styles.css';

const QuestionGroup = React.createClass({

   propTypes: {
      gid: React.PropTypes.string,
      group: React.PropTypes.string,
      time: React.PropTypes.string,
      questions: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          id: React.PropTypes.string,
          question: React.PropTypes.string,
          asked: React.PropTypes.string,
          time: React.PropTypes.string,
          description: React.PropTypes.string,
          decision: React.PropTypes.string
        }))
   },

   render: function() {
      return (
         <div className={styles.question}>
            <div className={bootstrap.row}>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-2'])}>
                  <h3><small>{this.props.time}</small></h3>
               </div>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-10'])}>
                  <h3>{this.props.group}</h3>
               </div>
            </div>
         </div>
      );
   }
});

export default QuestionGroup;
