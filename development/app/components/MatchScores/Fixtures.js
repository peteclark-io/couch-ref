'use strict'

import React from 'react';

import {Link} from 'react-router';
import {ThreeBounce} from 'better-react-spinkit';

import styles from './styles.css';
import Score from './Score';

const Fixtures = React.createClass({

   propTypes: {
      title: React.PropTypes.string,
      fixtures: React.PropTypes.array
   },

   render: function() {
      if (!this.props.fixtures || this.props.fixtures.length === 0){
         return (
            <div className={styles.loading}>
               <ThreeBounce />
            </div>
         );
      }

      if(this.props.fixtures.length === 0){
         return (
            <div className={styles['fixture-list']}>
               <h2 className={styles.header}>Upcoming Fixtures</h2>
               <h4 className={styles['no-fixtures']}>No Fixtures right now! Check back later for new fixtures.</h4>
            </div>
         )
      }

      return (
         <div className={styles['fixture-list']}>
            <h2 className={styles.header}>{this.props.title}</h2>
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

export default Fixtures;
