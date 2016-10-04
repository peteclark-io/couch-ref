'use strict'

import React from 'react';
import styles from './styles.css';

const TeamSheet = React.createClass({

  propTypes: {
    'referee': React.PropTypes.string,
    'homeLineup': React.PropTypes.arrayOf(
      React.PropTypes.shape({
        'number': React.PropTypes.number,
        'moniker': React.PropTypes.string,
        'fullName': React.PropTypes.string,
        'position': React.PropTypes.string
      })),
    'awayLineup': React.PropTypes.arrayOf(
      React.PropTypes.shape({
        'number': React.PropTypes.number,
        'moniker': React.PropTypes.string,
        'fullName': React.PropTypes.string,
        'position': React.PropTypes.string
      }))
  },

  render: function() {
    return (
      <div>
         <h4 className={styles.referee}>Referee: {this.props.referee}</h4>
         
      </div>
    );
  }
});

export default TeamSheet;
