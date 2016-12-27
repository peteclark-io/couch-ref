'use strict';

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import CouchRefHeader from '../components/Common/CouchRefHeader';
import MatchList from './sections/MatchList';
import UserScorePage from './sections/UserScorePage';
import styles from './styles.css';

const DesktopApp = React.createClass({

   render: function() {
      return (
         <div>
            <CouchRefHeader />
            <div className={classNames(bootstrap.container, styles['header-height'])}>
               <div className={bootstrap.row}>
                  <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-4'], bootstrap['col-lg-4'])}>
                     <MatchList />
                  </div>
                  <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-8'], bootstrap['col-lg-8'])}>
                     {(!this.props.children || this.props.children.length === 0) ? <UserScorePage hideFixturesLink={true} /> : this.props.children}
                  </div>
               </div>
            </div>
         </div>
      );
   }
});

export default DesktopApp;
