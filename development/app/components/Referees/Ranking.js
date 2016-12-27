'use strict'

import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';

const Ranking = React.createClass({

   propTypes: {
      rank: React.PropTypes.number,
      total: React.PropTypes.number,
      movement: React.PropTypes.number
   },

   suffix: (rank) => {
      if (rank % 10 === 1) {
         return 'st';
      } else if (rank % 10 === 2) {
         return 'nd';
      } else if (rank % 10 === 3) {
         return 'rd';
      }
      return 'th';
   },

   render: function() {
      return (
         <div className={classNames(styles['overall-ranking'], styles.centred)}>
            <h2 className={styles.rank}>Ranked {this.props.rank ? this.props.rank + this.suffix(this.props.rank) : 'Unranked'} <small>out of {this.props.total} Referees</small></h2>
         </div>
      );
   }
});

export default Ranking;
