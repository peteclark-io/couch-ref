'use strict';

import React from 'react';

import {connect} from 'react-redux';
import {Link} from 'react-router';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {ThreeBounce} from 'better-react-spinkit';
import {saveVote} from '../../core/db-actions';
import {saveVoteAsCookie} from '../../core/cookies';
import {questionScore} from '../../core/scores';

import {vote} from '../../ducks/user';

import ResultsIndicator from './ResultsIndicator';
import styles from './styles.css';
import buttons from './buttons.css';

export const Question = React.createClass({

   contextTypes: {
      user: React.PropTypes.object
   },

   propTypes: {
      question: React.PropTypes.shape({
         id: React.PropTypes.string,
         question: React.PropTypes.string,
         controversial: React.PropTypes.bool,
         time: React.PropTypes.string,
         description: React.PropTypes.string,
         decision: React.PropTypes.string,
         scored: React.PropTypes.bool,
         votingClosed: React.PropTypes.bool
      }),
      votedOn: React.PropTypes.bool,
      vote: React.PropTypes.func,
      user: React.PropTypes.object
   },

   render: function() {
      if (!this.props.question){
         return (
            <div className={styles.loading}>
               <ThreeBounce />
            </div>
         );
      }

      return (
         <div>
            {
               this.props.question.controversial ?
               <div className={bootstrap.row}>
                  <div className={bootstrap['col-xs-12']}>
                     <h2 className={styles.controversy}>Game Changer!</h2>
                  </div>
               </div>
               : null
            }

            <div className={bootstrap.row}>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-2'])}>
                  <h3 className={styles.time}><small>{this.props.question.time}</small></h3>
               </div>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-10'])}>
                  <h3>{this.props.question.question}</h3>
                  {
                     this.props.question.decision && this.props.question.decision !== '' ?
                     <h4>REFEREE&#39;S CALL: <span className={styles.decision}>{this.props.question.decision}</span></h4>
                     : null
                  }
                  {
                     this.props.question.description && this.props.question.description !== '' ?
                     <h4><small>{this.props.question.description}</small></h4>
                     : null
                  }
               </div>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-offset-2'], bootstrap['col-sm-10'])}>
                  {
                     !this.props.votedOn && !this.props.question.votingClosed ?
                     <div>
                        <div className={styles.spacer}></div>
                        <a onClick={() => {this.props.vote(this.props.user, this.props.question, true)}}
                           className={classNames(buttons['action-button'], buttons.yes, buttons.animate, styles.button)}>Yes</a>
                        <a onClick={() => {this.props.vote(this.props.user, this.props.question, false)}}
                           className={classNames(buttons['action-button'], buttons.no, buttons.animate, styles.button)}>No</a>
                     </div>
                     :
                     <div>
                        <ResultsIndicator id={this.props.question.id} />
                        <div className={styles.spacer}></div>
                        <Link className={styles.link} to={`/question/${this.props.question.id}`}>Show Detailed Results</Link>
                     </div>
                  }
               </div>
            </div>
         </div>
      );
   }
});

const getQuestion = (state = {questions: {}}, id) => {
   return state.questions[id] ? state.questions[id] : {};
};

const getVotes = (state = { user: {votes: {} } }, id) => {
   return state.user.votes && state.user.votes[id] ? true : false;
};

const getUser = (state = { user: {} }) => {
   return state.user;
};

const mapStateToProps = (state, ownProps) => {
   return {
      question: getQuestion(state, ownProps.id),
      votedOn: getVotes(state, ownProps.id),
      user: getUser(state)
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      vote: (user, question, result) => {
         saveVote(user, question, result);
         saveVoteAsCookie(user, question, result);
         dispatch(vote(question, result));
      }
   }
};

const LiveQuestion = connect(
   mapStateToProps,
   mapDispatchToProps
)(Question);

export default LiveQuestion;
