'use strict'

import React from 'react';
import styles from './styles.css';

const KickOff = React.createClass({

  propTypes: {
    'kickOff': React.PropTypes.object
  },

  render: function() {
    return (
        <span className={styles['kick-off']} ref={node => (this.root = node)}>{this.props.kickOff.format("ddd Do MMM HH:mm")}</span>
    );
  }
});

export default KickOff;
