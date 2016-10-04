'use strict'

import React from 'react';

import styles from './MatchList.css';
import LiveScores from '../components/Matches/LiveScores';
import CouchRefHeader from '../components/Common/CouchRefHeader';

const MatchList = React.createClass({

  render: function() {
    return (
      <div>
         <h2>Live Scores</h2>
         <LiveScores />
      </div>
    );
  }
});

export default MatchList;
