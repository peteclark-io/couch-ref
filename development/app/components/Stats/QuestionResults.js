'use strict';

import React from 'react';
import {connect} from 'react-redux';

import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {ThreeBounce} from 'better-react-spinkit';

import styles from './styles.css';
import OverallChart from './OverallChart';
import SideCharts from './SideCharts';

const QuestionResults = React.createClass({

  propTypes: {
    results: React.PropTypes.shape({
       id: React.PropTypes.string,
       simple: React.PropTypes.shape({
         yes: React.PropTypes.number,
         no: React.PropTypes.number
       })
    })
  },

  render: function() {
      if (!this.props.results){
        return (
          <div className={styles.loading}>
            <ThreeBounce />
          </div>
        );
      }

      return (
        <div className={bootstrap.row}>
          <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-8'])}>
            <div className={bootstrap.row}>
              <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-12'])}>
                <h3 className={styles.verdict}>Verdict</h3>
              </div>
            </div>
          </div>
          <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-4'])}>
            <SideCharts results={this.props.results} />
          </div>
        </div>
      );
  }
});

const getQuestionResults = (state = {statistics: {}}, id) => {
  return state.statistics[id] ? state.statistics[id] : {id: id, simple: {yes: 0, no: 0}};
};

const mapStateToProps = (state, ownProps) => {
   return {
     results: getQuestionResults(state, ownProps.id)
   };
};

const LiveQuestionResults = connect(
  mapStateToProps
)(QuestionResults);

export default LiveQuestionResults;
