'use strict'

import React from 'react';
import styles from './styles.css';
import Score from './Score';
import {Link} from 'react-router';

const Scores = React.createClass({

  propTypes: {
    matches: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        'id': React.PropTypes.string,
        'home': React.PropTypes.string,
        'away': React.PropTypes.string,
        'goalsHome': React.PropTypes.number,
        'goalsAway': React.PropTypes.number
      }))
  },

  render: function() {
    return (
      <ul className={styles['match-list']}>
        {this.props.matches.map(function(match) {
          return <li className={match.fullTime ? styles['full-time'] : ''} key={match.id}>
                    <Link className={styles.link} to={`/match/${match.id}`}>
                      <Score match={match} />
                    </Link>
                 </li>;
        })}
      </ul>
    );
  }
});

export default Scores;
