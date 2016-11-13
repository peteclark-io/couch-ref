'use strict';

import React from 'react';
import { connect } from 'react-redux';

import {ThreeBounce} from 'better-react-spinkit';

import styles from './styles.css';

const QuestionHeader = React.createClass({

  propTypes: {
     question: React.PropTypes.shape({
        id: React.PropTypes.string,
        question: React.PropTypes.string,
        controversial: React.PropTypes.bool,
        asked: React.PropTypes.string,
        time: React.PropTypes.string,
        description: React.PropTypes.string,
        decision: React.PropTypes.string
     })
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
        <h1 className={styles.header}>{this.props.question.question}</h1>
        {
          this.props.question.decision !== '' ?
          <h4 className={styles.referee}>Referee Decision: <span className={styles.decision}>{this.props.question.decision}</span></h4>
          : undefined
        }
      </div>
    );
  }
});

const getQuestion = (state = {questions: {}}, id) => {
  return state.questions[id] ? state.questions[id] : {};
};

const mapStateToProps = (state, ownProps) => {
   return {
     question: getQuestion(state, ownProps.id)
   };
};

const LiveQuestionHeader = connect(
  mapStateToProps
)(QuestionHeader);

export default LiveQuestionHeader;
