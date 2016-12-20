'use strict';

import React from 'react';
import {connect} from 'react-redux';

import SimpleLine from '../Charts/SimpleLine';
import styles from './styles.css';

const ResultsIndicator = React.createClass({

   propTypes: {
      statistic: React.PropTypes.shape({
         simple: React.PropTypes.shape({
            yes: React.PropTypes.number,
            no: React.PropTypes.number,
         })
      })
   },

   render: function() {
      if (!this.props.statistic){
         return null;
      }

      var data = [{title: 'Yes', value: this.props.statistic.simple.yes}, {title: 'No', value: this.props.statistic.simple.no}];

      return (
         <div className={styles['results-indicator']}>
            <SimpleLine data={data} />
         </div>
      );
   }
});

export default ResultsIndicator;
