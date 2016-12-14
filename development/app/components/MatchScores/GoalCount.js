'use strict'

import React from 'react';
import styles from './styles.css';

const GoalCount = React.createClass({

   propTypes: {
      'goals': React.PropTypes.number
   },

   render: function() {
      return (
         <span className={styles.goals} ref={node => (this.root = node)}>{this.props.goals}</span>
      );
   }
});

export default GoalCount;
