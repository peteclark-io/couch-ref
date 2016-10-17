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
      asked: React.PropTypes.string,
      questions: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          id: React.PropTypes.string
        }))
   },

   render: function() {
      return (
         <div className={styles.question}>
            <div className={classNames(bootstrap.row, styles['question-group'])}>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-2'])}>
                  <h1 className={styles.time}><small>{this.props.time}</small></h1>
               </div>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-10'])}>
                  <h1 className={styles['group-title']}>{this.props.group}</h1>
               </div>
            </div>
            <div className={bootstrap.row}>
               {this.props.questions.map(question => {
                 return <div className={bootstrap['col-xs-12']} key={question.id}>
                           <Question id={question.id} />
                        </div>;
               })}
            </div>
         </div>
      );
   }
});

export default QuestionGroup;
