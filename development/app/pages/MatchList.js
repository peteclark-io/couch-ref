'use strict'

import React from 'react';

import styles from './MatchList.css';
import LiveScores from '../components/Scores/LiveScores';
import CouchRefHeader from '../components/Common/CouchRefHeader';

const MatchList = React.createClass({

  render: function() {
    return (
      <div>
         <h2 className={styles.header}>Live Scores</h2>
         <div className={styles.spacer}></div>
         <LiveScores />
      </div>
    );
  }
});

export default MatchList;
