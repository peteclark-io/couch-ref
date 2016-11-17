'use strict'

import React from 'react';

import QuestionResults from '../../components/Stats/QuestionResults';

const StatsPage = React.createClass({

  render: function() {
    return (
      <div>
        <QuestionResults id={this.props.params.questionId} />
      </div>
    );
  }
});

export default StatsPage;
