'use strict'

import React from 'react';
import _ from 'lodash';

import {Link} from 'react-router';

import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import RatedMatch from '../Common/RatedMatch';

import {inflation} from '../../core/magic';
import styles from './styles.css';

const RecentMatches = React.createClass({

   propTypes: {
      referee: React.PropTypes.object,
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
            <h1 className={styles.heading}>Recent Matches</h1>
            {recent.map(match => {
               return (
                  <RatedMatch key={match.id} match={match} score={this.props.scores[match.id]} link={`/referee/${this.props.referee.id}/ratings/${match.id}`} />
               )
            })}
         </div>
      );
   }
});

export default RecentMatches;
