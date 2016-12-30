'use strict'

import React from 'react';
import _ from 'lodash';
import {ThreeBounce} from 'better-react-spinkit';

import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import Question from './Question';
import styles from './styles.css';

const QuestionList = React.createClass({

   propTypes: {
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

   checkReady: (list, questions, statistics) => {
      var test = list.filter((q) => {
         return !questions[q.id] || !statistics[q.id];
      });
      return test.length === 0;
   },

   render: function() {
      if (!this.props.questions || !this.props.statistics || !this.checkReady(this.props.list, this.props.questions, this.props.statistics)){
         return (
            <div className={styles.loading}>
               <ThreeBounce />
            </div>
         );
      }

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
