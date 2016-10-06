'use strict'

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './styles.css';
import Question from './Question';

const QuestionStack = React.createClass({

   propTypes: {
      question: React.PropTypes.string
   },

   render: function() {
      return (
         <div>
            <h1 className={styles.question}>Live Questions</h1>
            <div className={bootstrap.row}>
               <div className={bootstrap['col-xs-12']}>
                  <Question time="92min" question="Should Koscielny's Goal Stand?" number={1} />
               </div>
               <div className={bootstrap['col-xs-12']}>
                  <Question time="57min" question="Should the referee have booked Mustafi?" number={2} />
               </div>
            </div>
         </div>
      );
   }
});

export default QuestionStack;
