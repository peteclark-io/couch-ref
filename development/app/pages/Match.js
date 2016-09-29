'use strict'

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './MatchList.css';
import LiveScores from '../components/Matches/LiveScores';
import CouchRefHeader from '../components/Common/CouchRefHeader';

const Match = React.createClass({

  render: function() {
    return (
      <div className={bootstrap.container}>
        <div className={bootstrap.row}>
          <div className={classNames(bootstrap['col-xs-12'])}>
            <h2>Match</h2>
          </div>
        </div>
        <div className={styles.spacer}></div>
        <div className={bootstrap.row}>
          <div className={bootstrap['col-xs-12'], bootstrap['col-md-6'], bootstrap['col-lg-4']}>
            <LiveScores />
          </div>
        </div>
      </div>
    );
  }
});

export default Match;
