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
            <div className={bootstrap['col-xs-6']}>
              <h1>CouchRef</h1>
            </div>
            <div className={bootstrap['col-xs-6']}>
              <Link to={`/users`}><h1 className={bootstrap['pull-right']}>Profile</h1></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default CouchRefHeader;
