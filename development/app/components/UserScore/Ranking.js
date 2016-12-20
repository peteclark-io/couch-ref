'use strict'

import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';

const Ranking = React.createClass({

   propTypes: {
      rank: React.PropTypes.number,
      movement: React.PropTypes.number
   },

   render: function() {
      return (
         <div className={classNames(styles['overall-ranking'], styles.centred)}>
            <h1 className={styles.heading}>Your Ranking!</h1>
            <h2 className={styles.rank}>#{this.props.rank ? this.props.rank : 'Unranked'}!</h2>
         </div>
      );
   }
});

export default Ranking;
