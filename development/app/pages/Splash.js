'use strict';

import React from 'react';
import styles from './Splash.css';

const Splash = React.createClass({

   render: function() {
     return (
      <div className={styles.splash}>
         <h1 className={styles.brand}>Couch Ref</h1>
         <h3 className={styles.loading}>Loading</h3>
      </div>
    );
  }
});

export default Splash;
