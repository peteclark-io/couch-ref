'use strict'

import React from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router';

import styles from './styles.css';

const CouchRefHeader = React.createClass({

  render: function() {
    return (
      <div className={styles['brand-header']}>
        <div className={bootstrap.container}>
          <div className={bootstrap.row}>
            <div className={bootstrap['col-xs-4']}>
              <Link to={`/`}><h1>CouchRef</h1></Link>
            </div>
            <div className={bootstrap['col-xs-8']}>
              <Link to={`/users/edit`}><h3 className={bootstrap['pull-right']}>Profile</h3></Link>
              <Link to={`/score`}><h3 className={bootstrap['pull-right']}>Your Score</h3></Link>
              {/*<Link to={`/referees`}><h3 className={bootstrap['pull-right']}>Referees</h3></Link>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default CouchRefHeader;
