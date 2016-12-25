'use strict'

import React from 'react';
import {Link} from 'react-router';

import GoalCount from './GoalCount';
import Team from './Team';
import KickOff from './KickOff';

import styles from './styles.css';

const Score = React.createClass({

   propTypes: {
      match: React.PropTypes.shape({
         'id': React.PropTypes.string,
         'kickOff': React.PropTypes.object,
         'home': React.PropTypes.string,
         'away': React.PropTypes.string,
         'goalsHome': React.PropTypes.number,
         'goalsAway': React.PropTypes.number
      })
   },

   render: function() {
      return (
         <div className={styles.fixture}>
            <KickOff kickOff={this.props.match.kickOff} />
            <div className={styles.home}>
               <Team name={this.props.match.home} />
               <GoalCount goals={this.props.match.goalsHome} />
            </div>
            <div className={styles.away}>
               <Team name={this.props.match.away} />
               <GoalCount goals={this.props.match.goalsAway} />
            </div>
            {this.props.match.live ? <Link className={styles.link} to={`/match/${this.props.match.id}`}>Follow Match Live!</Link> : null}
         </div>
      );
   }
});

export default Score;
