'use strict'

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './styles.css';
import Question from './Question';
import QuestionGroup from './QuestionGroup';

const QuestionStack = React.createClass({

   propTypes: {
      questions: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          id: React.PropTypes.string,
          gid: React.PropTypes.string,
          group: React.PropTypes.string,
          asked: React.PropTypes.string,
          question: React.PropTypes.string,
          time: React.PropTypes.string,
          description: React.PropTypes.string,
          decision: React.PropTypes.string
        }))
   },

   render: function() {
      return (
         <div>
            <h1 className={styles.question}>Live Questions</h1>
            <div className={bootstrap.row}>
               {this.props.questions.map(question => {
                 if (question.gid){
                   return <div className={bootstrap['col-xs-12']} key={question.id}>
                             <QuestionGroup
                                 gid={question.gid}
                                 time={question.time}
                                 group={question.group}
                               />
                          </div>;
                 }
                 return <div className={bootstrap['col-xs-12']} key={question.id}>
                           <Question
                               id={question.id}
                               time={question.time}
                               asked={question.asked}
                               question={question.question}
                               description={question.description}
                               decision={question.decision}
                             />
                        </div>;
               })}

            </div>
         </div>
      );
   }
});

export default QuestionStack;
