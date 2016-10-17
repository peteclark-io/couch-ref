'use strict'

import React from 'react';

import QuestionHeader from '../../components/Stats/QuestionHeader';
import QuestionResults from '../../components/Stats/QuestionResults';

const StatsPage = React.createClass({

  render: function() {
    return (
      <div>
        <QuestionHeader id={this.props.params.questionId} />
        <QuestionResults id={this.props.params.questionId} />
      </div>
    );
  }
});

export default StatsPage;
