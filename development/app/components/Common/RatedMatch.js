'use strict'

import React from 'react';
import {Link} from 'react-router';

import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {inflation} from '../../core/magic';
import styles from './ratings.css';

const RatedMatch = React.createClass({

   propTypes: {
      match: React.PropTypes.object,
      score: React.PropTypes.number,
      link: React.PropTypes.string
   },

   sign: (val) => {
      if (val > 0){
         return '+';
      }
      return null;
   },

   bground: (val) => {
      return val >= 0 ? styles.green : styles.red;
   },

   render: function() {
      var match = this.props.match;
      var score = this.props.score;
      return (
         <div className={classNames(bootstrap.row, styles['recent-match'])}>
            <div className={classNames(bootstrap['col-xs-2'], bootstrap['col-sm-2'], bootstrap['col-md-2'], bootstrap['col-lg-1'])}>
               <p className={classNames(styles.score, this.bground(score))}>{this.sign(score)}{(score * inflation).toFixed(0)}</p>
            </div>
            <div className={classNames(bootstrap['col-xs-10'])}>
               <h2>{match.home} vs {match.away}</h2>
               <h3><small>{match.kickOff.format("ddd Do MMM HH:mm")}</small></h3>
               <Link className={styles.link} to={this.props.link ? this.props.link : `/ratings/${match.id}`}>Show Match Ratings</Link>
            </div>
         </div>
      );
   }
});

export default RatedMatch;
