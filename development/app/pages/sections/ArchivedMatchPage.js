'use strict'

import React from 'react';
import ArchiveMatch from '../../components/Matches/ArchiveMatch';

const ArchivedMatchPage = React.createClass({

  render: function() {
    return (
      <ArchiveMatch id={this.props.params.matchId} />
    );
  }
});

export default ArchivedMatchPage;
