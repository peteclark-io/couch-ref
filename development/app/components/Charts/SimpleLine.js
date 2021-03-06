'use strict'

import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import Measure from 'react-measure';

import _ from 'lodash';

import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {max} from "d3-array";

const SimpleLine = React.createClass({

   propTypes: {
     data: React.PropTypes.arrayOf(React.PropTypes.shape({
       title: React.PropTypes.string,
       value: React.PropTypes.number
     })),
     width: React.PropTypes.number
   },

   getInitialState: function(){
      return {dimensions: {}};
   },

   render: function() {
      if (!this.props.data) {
         return null;
      }

      if (_.sumBy(this.props.data, 'value') === 0){
        return null;
      }

      var chart = ReactFauxDOM.createElement('svg')
      var xAxis = scaleLinear().domain([0, max(this.props.data.map(i => i.value))]).range([0, this.state.dimensions.width]);

      var bars = select(chart)
        .attr('width', '100%')
        .attr('height', '24px')
        .selectAll('g')
        .data(this.props.data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => {
          var trans = (i * 12) + 8;
          return 'translate(0,' + trans +  ')';
        });

      bars.append('text')
          .style('font-size', '10px')
          .attr('dy', -1)
          .text((d) => {
            return d.title;
          });

      bars.append('rect')
         .attr('width', (d) => { return xAxis(d.value); })
         .attr('height', 3)
         .attr('fill', (d, i) => { return i % 2 === 0 ? '#66d3e4' : 'rgba(60,90,150,1)'});

      return (
         <Measure onMeasure={(dimensions) => {
            this.setState({dimensions})
         }}>
            {chart.toReact()}
         </Measure>
      );
   }
});

export default SimpleLine;
