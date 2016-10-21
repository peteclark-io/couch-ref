'use strict'

import React from 'react';

import LiveScores from '../../components/Scores/LiveScores';
import CouchRefHeader from '../../components/Common/CouchRefHeader';

const MatchList = React.createClass({

  render: function() {
    return (
      <LiveScores />
    );
  }
});

export default MatchList;
