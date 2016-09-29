'use strict';

import React from 'react';
import CouchRefHeader from '../components/Common/CouchRefHeader';
import MatchList from './MatchList';

const CouchRef = React.createClass({

  render: function() {
    return (
      <div>
        <CouchRefHeader />
        <MatchList />
      </div>
    );
  }
});

export default CouchRef;
