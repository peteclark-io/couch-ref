'use strict'

import React from 'react';

import styles from './styles.css';
import TeamSheet from './TeamSheet';

const Match = React.createClass({

   propTypes: {
     match: React.PropTypes.shape({
         'id': React.PropTypes.string,
         'home': React.PropTypes.string,
         'away': React.PropTypes.string,
         'goalsHome': React.PropTypes.number,
         'goalsAway': React.PropTypes.number,
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
       })
   },

   render: function() {
      return (
         <div>
           <h2 className={styles['match-header']}>{this.props.match.home} {this.props.match.goalsHome}  -  {this.props.match.goalsAway} {this.props.match.away}</h2>
           <TeamSheet
              referee={this.props.match.referee}
              homeLineup={this.props.match.homeLineup}
              awayLineup={this.props.match.awayLineup} />
         </div>
      );
   }
});

export default Match;
