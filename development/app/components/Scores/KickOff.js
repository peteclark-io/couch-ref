'use strict'

import React from 'react';
import styles from './styles.css';
import moment from 'moment';

const KickOff = React.createClass({

  propTypes: {
    'kickOff': React.PropTypes.string
  },

  render: function() {
    var kickOffLocal = moment(this.props.kickOff);
    return (
        <span className={styles['kick-off']} ref={node => (this.root = node)}>{kickOffLocal.format("ddd Do MMM HH:mm")}</span>
    );
  }
});

export default KickOff;
