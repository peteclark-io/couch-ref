'use strict';

import React from 'react';
import {Bar} from 'react-chartjs-2';

const groups = ['< 20', '21 - 30', '31 - 40', '41 - 50', '51 - 60', '60+'];

const AgeBreakdownChart = React.createClass({

  propTypes: {
     age: React.PropTypes.object,
     height: React.PropTypes.number
  },

  getInitialState: function(){
     return {dimensions: {}};
  },

  render: function() {
    if (this.props.yes === 0 && this.props.no === 0) {
      return (
        <h5>No data!</h5>
      );
    }

    var yep = groups.map((group) => {
      var data = this.props.age[group];
      return data ? data.yes : 0;
    });

    var nope = groups.map((group) => {
      var data = this.props.age[group];
      return data ? data.no : 0;
    });

    var data = {
      labels: groups,
      datasets: [
        {
          data: yep,
          backgroundColor: ['rgba(60,90,150,1)','rgba(60,90,150,1)','rgba(60,90,150,1)','rgba(60,90,150,1)','rgba(60,90,150,1)','rgba(60,90,150,1)']
        },
        {
          data: nope,
          backgroundColor: ['#66d3e4','#66d3e4','#66d3e4','#66d3e4','#66d3e4','#66d3e4']
        }
      ]
    };

    var options = {
      responsive: true,
      legend: {
        display: false,
        position: 'right',
        labels: {
          boxWidth: 10
        }
      },
      scales: {
        xAxes: [{
            gridLines: {
              display: false
            }
        }],
        yAxes: [{
          display: false,
          stacked: false
        }]
      }
    };

    return (
      <Bar
        options={options}
        data={data} />
    );
  }
});

export default AgeBreakdownChart;
