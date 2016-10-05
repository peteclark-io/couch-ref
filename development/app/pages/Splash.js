'use strict';

import React from 'react';
import styles from './Splash.css';

import {ThreeBounce} from 'better-react-spinkit';

const Splash = React.createClass({

   render: function() {
     return (
      <div className={styles.splash}>
         <h1 className={styles.brand}>Couch Ref</h1>
         <div className={styles.loader}>
            <ThreeBounce color="white" />
         </div>
      </div>
    );
  }
});

export default Splash;
