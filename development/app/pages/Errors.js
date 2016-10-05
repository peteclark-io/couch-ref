'use strict';

import React from 'react';
import styles from './Errors.css';

const Errors = React.createClass({

   render: function() {
     return (
      <div className={styles.splash}>
         <h1 className={styles.error}>Oh No!</h1>
         <h3 className={styles.message}>Something went wrong! Please refresh the page. <span className={styles.emoji}>😫</span></h3>
      </div>
    );
  }
});

export default Errors;
