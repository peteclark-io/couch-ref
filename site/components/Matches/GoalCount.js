'use strict'

import React from 'react';
import styles from './styles.css';

class GoalCount extends React.Component {

  static propTypes = {
    'goals': React.PropTypes.number
  };

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <span className={styles.goals} ref={node => (this.root = node)}>{this.props.goals}</span>
    );
  }

}

export default GoalCount;
