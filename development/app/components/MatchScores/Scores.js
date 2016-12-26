'use strict'

import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import {Link} from 'react-router';
import {ThreeBounce} from 'better-react-spinkit';

import styles from './styles.css';
import Score from './Score';

const Scores = React.createClass({

   propTypes: {
      matches: React.PropTypes.arrayOf(
         React.PropTypes.shape({
            'id': React.PropTypes.string,
            'home': React.PropTypes.string,
            'away': React.PropTypes.string,
            'kickOff': React.PropTypes.object,
            'goalsHome': React.PropTypes.number,
            'goalsAway': React.PropTypes.number
         }))
      },

      render: function() {
         if (this.props.matches.length === 0){
            return (
               <div className={styles.loading}>
                  <ThreeBounce />
               </div>
            );
         }

         var today = moment(24, 'HH'); // midnight tonight
         var yesterday = moment(24, 'HH').subtract(1, 'days'); // midnight last night

         var todaysFixtures = _.filter(this.props.matches, (i) => {
            return i.kickOff.isBefore(today) && i.kickOff.isAfter(yesterday) && i.televised;
         });

         var title = 'Upcoming Fixtures';
         var fixtures = [];
         if (todaysFixtures.length > 0){
            fixtures = todaysFixtures;
            title = 'Today\'s Fixtures';
         } else {
            fixtures = _.filter(this.props.matches, (i) => {
               return i.kickOff.isAfter(today) && i.televised;
            });
         }

         fixtures = _.sortBy(fixtures, ['fullTime', 'kickOff']);

         if(fixtures.length === 0){
            return (
               <div>
                  <h2 className={styles['fixture-list-header']}>{title}</h2>
                  <div className={styles.spacer}></div>
                  <h4 className={styles['no-fixtures']}>No Fixtures right now! Check back later for new fixtures.</h4>
               </div>
            )
         }

         return (
            <div>
               <h2 className={styles['fixture-list-header']}>{title}</h2>
               <div className={styles.spacer}></div>

               <ul className={styles['match-list']}>
                  {fixtures.map(function(match) {
                     return (
                        <li key={match.id}>
                           <Score match={match} />
                        </li>
                     );
                  })}
               </ul>
            </div>
         );
      }
   });

   export default Scores;
