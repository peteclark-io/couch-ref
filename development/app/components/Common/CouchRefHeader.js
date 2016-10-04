'use strict'

import React from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from './styles.css';

const CouchRefHeader = React.createClass({

  render: function() {
    return (
      <div className={styles['brand-header']}>
        <div className={bootstrap.container}>
          <h1>CouchRef</h1>
        </div>
      </div>
    );
  }
});

export default CouchRefHeader;
