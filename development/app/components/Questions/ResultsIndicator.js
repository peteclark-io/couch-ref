'use strict';

import React from 'react';
import {connect} from 'react-redux';

import SimpleLine from '../Charts/SimpleLine';
import styles from './styles.css';

const ResultsIndicator = React.createClass({

   propTypes: {
     data: React.PropTypes.arrayOf(React.PropTypes.object)
   },

   render: function() {
       if (!this.props.data){
         return null;
       }

      return (
         <div className={styles['results-indicator']}>
            <SimpleLine data={this.props.data} />
         </div>
      );
   }
});

const getQuestionResults = (state = {statistics: {}}, id) => {
  if (state.statistics[id]){
    return [{title: 'Yes', value: state.statistics[id].simple.yes}, {title: 'No', value: state.statistics[id].simple.no}];
  }
  return undefined;
};

const mapStateToProps = (state, ownProps) => {
   return {
     data: getQuestionResults(state, ownProps.id)
   };
};

const LiveResultsIndicator = connect(
  mapStateToProps
)(ResultsIndicator);

export default LiveResultsIndicator;
