'use strict';

import React from 'react';
import styles from './MatchList.css';

const QuestionResults = React.createClass({

  render: function() {
    return (
      <LiveMatch id={this.props.params.matchId} />
    );
  }
});

export default QuestionResults;
