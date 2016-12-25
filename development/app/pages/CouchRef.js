'use strict';

import React from 'react';
import MediaQuery from 'react-responsive';

import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';

const CouchRef = React.createClass({

  render: function() {
    return (
      <div>
         <MediaQuery maxWidth={767}>
            <MobileApp children={this.props.children} />
         </MediaQuery>
         <MediaQuery minWidth={768}>
            <DesktopApp children={this.props.children} />
         </MediaQuery>
      </div>
    );
  }
});

export default CouchRef;
