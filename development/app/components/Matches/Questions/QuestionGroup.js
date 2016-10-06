'use strict';

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './styles.css';

const QuestionGroup = React.createClass({

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
            </div>
         </div>
      );
   }
});

export default QuestionGroup;
