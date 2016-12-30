'use strict'

import React from 'react';

import {Link} from 'react-router';
import {ThreeBounce} from 'better-react-spinkit';

import styles from './styles.css';
import Score from './Score';

const RecentFixtures = React.createClass({

   propTypes: {
      fixtures: React.PropTypes.array
   },

   render: function() {
      if (!this.props.fixtures){
         return (
            <div className={styles.loading}>
               <ThreeBounce />
            </div>
         );
      }

      if(this.props.fixtures.length === 0){
         return null;
      }

      return (
         <div className={styles['fixture-list']}>
            <h2 className={styles.header}>Recent Fixtures</h2>
            <ul className={styles['match-list']}>
               {this.props.fixtures.map(function(match) {
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

export default RecentFixtures;
