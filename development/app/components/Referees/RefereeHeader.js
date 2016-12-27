'use strict'

import React from 'react';
import {Link} from 'react-router';
import {ThreeBounce} from 'better-react-spinkit';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import styles from './styles.css';

const RefereeHeader = React.createClass({

   propTypes: {
      referee: React.PropTypes.object
   },

   render: function() {
      if (!this.props.referee){
         return (
            <div className={styles.loading}>
               <ThreeBounce />
            </div>
         );
      }

      return (
         <div className={classNames(styles['referee-header'], bootstrap.row)}>
            <div className={classNames(bootstrap['col-xs-12'])}>
               <h2>{this.props.referee.name.display}</h2>
               <h3><small>Professional Debut: {this.props.referee.debut.format("Do MMM YYYY")}</small></h3>
            </div>
         </div>
      );
   }
});

export default RefereeHeader;
