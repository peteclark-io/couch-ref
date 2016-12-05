'use strict';

import React from 'react';
import { connect } from 'react-redux';
import {ThreeBounce} from 'better-react-spinkit';

import version from '../../../version.json'
import styles from './Splash.css';

const Version = React.createClass({

   render: function() {
     return (
      <div className={styles.splash}>
         <h1 className={styles.brand}>CouchRef</h1>
         <h3 className={styles.version}>{version.version}</h3>
      </div>
    );
  }
});

export default Version;
