'use strict';

import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

const ClubsBreakdownChart = React.createClass({

   propTypes: {
      clubs: React.PropTypes.array,
      clubData: React.PropTypes.object,
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

      var yep = this.props.clubs.map((group) => {
         var data = this.props.clubData[group];
         return data ? data.yes : 0;
      });

      var nope = this.props.clubs.map((group) => {
         var data = this.props.clubData[group];
         return data ? data.no : 0;
      });

      var data = {
         labels: this.props.clubs,
         datasets: [
            {
               data: yep,
               backgroundColor: 'rgba(60,90,150,1)'
            },
            {
               data: nope,
               backgroundColor: '#66d3e4'
            }
         ]
      };

      var options = {
         responsive: true,
         tooltips: {
            enabled: false
         },
         legend: {
            display: false
         },
         scales: {
            yAxes: [{
               display: true,
               gridLines: {
                  display: false
               },
               afterFit: function(scaleInstance) {
                  scaleInstance.width = 100;
               }
            }],
            xAxes: [{
               display: false,
            }]
         }
      };

      return (
         <HorizontalBar
            height={250}
            options={options}
            data={data} />
      );
   }
});

export default ClubsBreakdownChart;
