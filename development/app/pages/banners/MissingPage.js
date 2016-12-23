'use strict';

import React from 'react';
import styles from './Errors.css';

const MissingPage = React.createClass({

   contextTypes: {
      router: React.PropTypes.object
   },

   render: function() {
      return (
         <div onClick={() => {this.context.router.push('/')}} className={styles.splash}>
            <h1 className={styles.error}>Sorry!</h1>
            <h3 className={styles.message}>We can't find the page you're looking for! Click anywhere to return to the homepage.</h3>
         </div>
      );
   }
});

export default MissingPage;
