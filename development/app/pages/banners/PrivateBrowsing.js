'use strict';

import React from 'react';
import styles from './PrivateBrowsing.css';

const PrivateBrowsing = React.createClass({

   render: function() {
      return (
         <div className={styles.splash}>
            <h1 className={styles.error}>Warning</h1>
            <h3 className={styles.message}>We've detected that you're using a private browser, most likely via an iOS device.</h3>
            <h3 className={styles.message}>Unfortunately, we're not currently able to provide the full CouchRef experience from within a private browser, as it prevents us from using some important browser functionality (namely <a href="https://www.html5rocks.com/en/features/storage">Local Storage</a>).</h3>
            <h3 className={styles.tldr}>If you'd like to use CouchRef (and we really hope you do), please switch to a regular browser window.</h3>
         </div>
      );
   }
});

export default PrivateBrowsing;
