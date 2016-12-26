'use strict'

import React from 'react';
import {Link} from 'react-router';
import {ThreeBounce} from 'better-react-spinkit';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import styles from './styles.css';

const MatchHeader = React.createClass({

   propTypes: {
      match: React.PropTypes.shape({
         'id': React.PropTypes.string,
         'home': React.PropTypes.string,
         'away': React.PropTypes.string,
         'goalsHome': React.PropTypes.number,
         'goalsAway': React.PropTypes.number
      })
   },

   render: function() {
      if (!this.props.match){
         return (
            <div className={styles.loading}>
               <ThreeBounce />
            </div>
         );
      }

      return (
         <div className={classNames(styles['match-header'], bootstrap.row)}>
            <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-8'])}>
               <h2>{this.props.match.home} {this.props.match.goalsHome}  -  {this.props.match.goalsAway} {this.props.match.away}</h2>
            </div>
         </div>
      );
   }
});

export default MatchHeader;
