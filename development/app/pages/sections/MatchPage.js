'use strict'

import React from 'react';
import LiveMatch from '../../components/Matches/LiveMatch';

const MatchPage = React.createClass({

  render: function() {
    return (
      <LiveMatch id={this.props.params.matchId} />
    );
  }
});

export default MatchPage;
