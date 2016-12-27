'use strict'

import React from 'react';
import {connect} from 'react-redux';

import _ from 'lodash';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import {inflation} from '../../core/magic';
import {matchScore} from '../../core/scores';
import styles from './styles.css';

const RefereeRating = React.createClass({

   propTypes: {
      score: React.PropTypes.number
   },

   render: function() {
      if(!this.props.score){
         return null;
      }

      var score = this.props.score * inflation;
      return (
         <div className={styles['match-rating']}>
            <h3>Referee Performance</h3>
            <h2>{this.props.score > 0 ? '+' : null}{score.toFixed(0)}</h2>
         </div>
      );
   }
});

export default RefereeRating;
