'use strict';

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import CouchRefHeader from '../components/Common/CouchRefHeader';
import MatchList from './MatchList';

const DesktopApp = React.createClass({

  render: function() {
    return (
      <div>
         <CouchRefHeader />
         <div className={bootstrap.container}>
            <div className={bootstrap.row}>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-md-6'], bootstrap['col-lg-4'])}>
                  <MatchList />
               </div>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-md-6'], bootstrap['col-lg-8'])}>
                  {this.props.children}
               </div>
            </div>
         </div>
      </div>
    );
  }
});

export default DesktopApp;
