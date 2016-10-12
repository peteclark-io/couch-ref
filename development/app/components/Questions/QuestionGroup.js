'use strict';

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import Question from './Question';
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
          decision: React.PropTypes.string,
          controversial: React.PropTypes.bool,
          refereeDecision: React.PropTypes.bool
        }))
   },

   render: function() {
      return (
         <div className={styles.question}>
            <div className={bootstrap.row}>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-2'])}>
                  <h2><small>{this.props.time}</small></h2>
               </div>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-10'])}>
                  <h2>{this.props.group}</h2>
               </div>
            </div>
            <div className={bootstrap.row}>
               {this.props.questions.map(question => {
                 return <div className={bootstrap['col-xs-12']} key={question.id}>
                           <Question question={question} />
                        </div>;
               })}
            </div>
         </div>
      );
   }
});

export default QuestionGroup;
