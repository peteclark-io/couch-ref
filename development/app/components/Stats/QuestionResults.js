'use strict';

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {ThreeBounce} from 'better-react-spinkit';
import {Doughnut} from 'react-chartjs-2';

import SimpleLine from '../Charts/SimpleLine';

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
        <div>
          <ThreeBounce />
        </div>
      );
    }

    console.log(this.props.results);

    var data = {
      labels: ['Yes', 'No'],
      datasets: [
        {
          data: [this.props.results.simple.yes, this.props.results.simple.no],
          backgroundColor: [
              'rgba(55,171,46,1)',
              '#ed5c5c'
          ]
        }
      ]
    };

    return (
      <div className={bootstrap.row}>
        <div className={bootstrap['col-xs-12']}>
        {
          this.props.results.simple.yes === 0 || this.props.results.simple.no === 0
          ? <h4>No Votes</h4> : <Doughnut data={data} height={150} />
        }
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
