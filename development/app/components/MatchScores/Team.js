'use strict'

import React from 'react';
import styles from './styles.css';

const Team = React.createClass({

   propTypes: {
      'name': React.PropTypes.string
   },

   render: function() {
      return (
         <span className={styles.teams} ref={node => (this.root = node)}>{this.props.name}</span>
      );
   }
});

export default Team;
