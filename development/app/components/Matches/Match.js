'use strict'

import React from 'react';

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
         <h2>{this.props.match.referee}</h2>
      );
   }
});

export default Match;
