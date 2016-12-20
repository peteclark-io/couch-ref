'use strict'

import React from 'react';
import _ from 'lodash';

import {Link} from 'react-router';

import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './styles.css';

const RecentMatches = React.createClass({

   propTypes: {
      matches: React.PropTypes.object,
      scores: React.PropTypes.object
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
      if (!this.props.matches){
         return null;
      }

      var recent = _.take(_.reverse(_.sortBy(_.values(this.props.matches), 'kickOff')), 5);

      return (
         <div className={styles['recent-matches']}>
            <h1 className={styles.heading}>Your Recent Matches</h1>
            {recent.map(match => {
               var score = _.sumBy(this.props.scores[match.id], 'score');
               return (
                  <div key={match.id} className={classNames(bootstrap.row, styles['recent-match'])}>
                     <div className={classNames(bootstrap['col-xs-2'], bootstrap['col-sm-2'], bootstrap['col-md-2'], bootstrap['col-lg-1'])}>
                        <p className={classNames(styles.score, this.bground(score))}>{this.sign(score)}{(score * 100).toFixed(0)}</p>
                     </div>
                     <div className={classNames(bootstrap['col-xs-10'])}>
                        <h2>{match.home} vs {match.away}</h2>
                        <h3><small>{match.kickOff.format("ddd Do MMM HH:mm")}</small></h3>
                        <Link className={styles.link} to={`/ratings/${match.id}`}>Show Match Ratings</Link>
                     </div>
                  </div>
               )
            })}
         </div>
      );
   }
});

export default RecentMatches;
