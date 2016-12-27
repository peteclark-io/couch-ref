'use strict'

import React from 'react';
import {Link} from 'react-router';

import styles from './styles.css';

const ScoresReady = React.createClass({

   propTypes: {
      match: React.PropTypes.object,
      ready: React.PropTypes.bool
   },

   render: function() {
      if (!this.props.ready || !this.props.match.id){
         return null;
      }

      return (
         <div className={styles['scores-ready']}>
            <Link to={`/ratings/` + this.props.match.id}><h2>View Your Scores!</h2></Link>
         </div>
      );
   }
});

export default ScoresReady;
