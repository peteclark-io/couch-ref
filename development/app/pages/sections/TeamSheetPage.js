'use strict';

import React from 'react';
import LiveTeamSheet from '../../components/Matches/LiveTeamSheet';

const TeamSheetPage = React.createClass({

  render: function() {
    return (
      <LiveTeamSheet id={this.props.params.matchId} />
    );
  }
});

export default TeamSheetPage;
