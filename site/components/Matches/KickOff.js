'use strict'

import React from 'react';
import styles from './styles.css';
import moment from 'moment';

class KickOff extends React.Component {

  static propTypes = {
    'kickOff': React.PropTypes.string
  };

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    var kickOffLocal = moment(this.props.kickOff);
    return (
        <span className={styles['kick-off']} ref={node => (this.root = node)}>{kickOffLocal.format("ddd Do HH:mm")}</span>
    );
  }
}

export default KickOff;