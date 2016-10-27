'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {ThreeBounce} from 'better-react-spinkit';

import styles from './styles.css';

const ClubCrests = React.createClass({

  propTypes: {
    clubs: React.PropTypes.array
  },

  render: function() {
    if (!this.props.clubs){
      return (
         <div className={styles.loading}>
           <ThreeBounce />
         </div>
      );
    }

    return (
      <div className={styles['clubs-container']}>
        <ul className={styles.clubs}>
           {this.props.clubs.map((c) => {
             return (
               <li key={c.name}>
                 <img src={c.crestUrl} alt={c.name} onClick={() => {
                   console.log('click!')
                 }}></img>
               </li>
             );
           })}
        </ul>
      </div>
    );
  }
});

export default ClubCrests;
