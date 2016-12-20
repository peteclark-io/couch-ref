'use strict'

import React from 'react';
import _ from 'lodash';

import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import Question from './Question';
import styles from './styles.css';

const QuestionList = React.createClass({

   propTypes: {
      archive: React.PropTypes.bool,
      list: React.PropTypes.arrayOf(
         React.PropTypes.shape({
            id: React.PropTypes.string,
            gid: React.PropTypes.string,
            group: React.PropTypes.string,
            asked: React.PropTypes.string,
            time: React.PropTypes.string
         }
      )),
      questions: React.PropTypes.object,
      statistics: React.PropTypes.object,
      user: React.PropTypes.object,
      vote: React.PropTypes.func
   },

   render: function() {
      var sortedList = _.reverse(_.sortBy(this.props.list, ['asked']));

      return (
         <div className={styles['questions-list']}>
            <h1 className={styles.header}>Live Questions</h1>
            <div className={bootstrap.row}>
               {
                  sortedList.length === 0 ?
                  <div className={bootstrap['col-xs-12']}>
                     <h4 className={styles.spacer}>No questions have been asked yet</h4>
                  </div>
                  : null
               }

               {sortedList.map(question => {
                  var full = this.props.questions[question.id];
                  var stats = this.props.statistics[question.id];

                  var votedOn = this.props.user.votes && this.props.user.votes[question.id] ? true : false;

                  if (!full){
                     return null;
                  }

                  return (
                     <div className={classNames(bootstrap['col-xs-12'], styles.question)} key={full.id}>
                        <Question
                           archive={this.props.archive}
                           question={full}
                           statistic={stats}
                           votedOn={votedOn}
                           vote={(vote) => {
                              this.props.vote(vote, full);
                           }} />
                     </div>
                     );
                  })}
               </div>
            </div>
         );
      }
   });

   export default QuestionList;
