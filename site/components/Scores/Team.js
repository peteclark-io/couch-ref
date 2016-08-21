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
      <h5 className={styles.subheading} ref={node => (this.root = node)}>{this.props.name}</h5>
    );
  }

}

export default Team;
