'use strict'

import React from 'react';
import styles from './styles.css';

import GoalCount from './GoalCount';
import Team from './Team';

class Scores extends React.Component {

  static propTypes = {
    match: React.PropTypes.shape({
      'home': React.PropTypes.string,
      'away': React.PropTypes.string,
      'goalsHome': React.PropTypes.number,
      'goalsAway': React.PropTypes.number
    })
  };

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <div ref={node => (this.root = node)}>
        <Team name={this.props.match.home} />
        <Team name={this.props.match.away} />
        <GoalCount goals={this.props.match.goalsHome} />
        <GoalCount goals={this.props.match.goalsAway} />
      </div>
    );
  }
}

export default Scores;
