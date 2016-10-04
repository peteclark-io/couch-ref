'use strict'

import React from 'react';

import styles from './MatchList.css';
import LiveScores from '../components/Matches/LiveScores';
import CouchRefHeader from '../components/Common/CouchRefHeader';

const Match = React.createClass({

  render: function() {
    return (
      <h2>{this.props.params.matchId}</h2>
    );
  }
});

export default Match;
