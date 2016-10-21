'use strict'

import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './styles.css';
import Question from './Question';
import QuestionGroup from './QuestionGroup';

const QuestionList = React.createClass({

   propTypes: {
      questions: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          id: React.PropTypes.string,
          gid: React.PropTypes.string,
          group: React.PropTypes.string,
          asked: React.PropTypes.string,
          time: React.PropTypes.string
        }))
   },

   render: function() {
      var questions = _.reverse(_.sortBy(this.props.questions, ['asked']));

      return (
         <div className={styles['questions-list']}>
            <h1 className={styles.header}>Live Questions</h1>
            <div className={bootstrap.row}>
               {
                  questions.length === 0 ?
                  <div className={bootstrap['col-xs-12']}>
                     <h4 className={styles.spacer}>No questions have been asked yet</h4>
                  </div>
                  : null
               }

               {questions.map(question => {
                 if (question.gid){
                   return <div className={bootstrap['col-xs-12']} key={question.gid}>
                             <QuestionGroup
                                 gid={question.gid}
                                 time={question.time}
                                 asked={question.asked}
                                 group={question.group}
                                 questions={question.questions}
                               />
                          </div>;
                 }
                 return <div className={classNames(bootstrap['col-xs-12'], styles.question)} key={question.id}>
                           <Question id={question.id} />
                        </div>;
               })}

            </div>
         </div>
      );
   }
});

export default QuestionList;
