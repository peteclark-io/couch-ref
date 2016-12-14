'use strict'

import React from 'react';
import styles from './styles.css';

import GoalCount from './GoalCount';
import Team from './Team';
import KickOff from './KickOff';

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
         <div ref={node => (this.root = node)}>
            <KickOff kickOff={this.props.match.kickOff} />
            <div className={styles.score}>
               <Team name={this.props.match.home} />
               <GoalCount goals={this.props.match.goalsHome} />
            </div>
            <div className={styles.score}>
               <Team name={this.props.match.away} />
               <GoalCount goals={this.props.match.goalsAway} />
            </div>
         </div>
      );
   }
});

export default Score;
