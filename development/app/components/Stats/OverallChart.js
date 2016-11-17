'use strict';

import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const OverallChart = React.createClass({

   propTypes: {
      yes: React.PropTypes.number,
      no:  React.PropTypes.number,
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

      var data = {
         labels: ['Yes', 'No'],
         datasets: [
            {
               data: [this.props.yes, this.props.no],
               backgroundColor: [
                  'rgba(60,90,150,1)',
                  '#66d3e4'
               ]
            }
         ]
      };

      var options = {
         tooltips: {
            enabled: false
         },
         responsive: true,
         legend: {
            display: true,
            position: 'right',
            labels: {
               boxWidth: 10
            }
         }
      };

      return (
         <Doughnut
            options={options}
            data={data} />
      );
   }
});

export default OverallChart;
