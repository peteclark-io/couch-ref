'use strict'

import React from 'react';
import styles from './styles.css';

class Team extends React.Component {

  static propTypes = {
    'name': React.PropTypes.string
  };

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <span className={styles.teams} ref={node => (this.root = node)}>{this.props.name}</span>
    );
  }

}

export default Team;
