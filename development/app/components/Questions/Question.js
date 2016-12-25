'use strict';

import React from 'react';

import {connect} from 'react-redux';
import {Link} from 'react-router';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {ThreeBounce} from 'better-react-spinkit';

import ResultsIndicator from './ResultsIndicator';
import styles from './styles.css';
import buttons from './buttons.css';

const Question = React.createClass({

   propTypes: {
      statistic: React.PropTypes.object,
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
      vote: React.PropTypes.func
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
                        <a className={classNames(buttons['action-button'], buttons.yes, buttons.animate, styles.button)}
                           onClick={() => {
                              this.props.vote(true)
                           }}>Yes</a>
                        <a className={classNames(buttons['action-button'], buttons.no, buttons.animate, styles.button)}
                           onClick={() => {
                              this.props.vote(false)
                           }}>No</a>
                     </div>
                     :
                     <div>
                        <ResultsIndicator statistic={this.props.statistic} />
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

export default Question;
