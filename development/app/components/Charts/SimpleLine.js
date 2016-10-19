'use strict'

import React from 'react';
import ReactFauxDOM from 'react-faux-dom';

import _ from 'lodash';

import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {max} from "d3-array";

import styles from './SimpleLine.css';

const SimpleLine = React.createClass({

   propTypes: {
     data: React.PropTypes.arrayOf(React.PropTypes.shape({
       title: React.PropTypes.string,
       value: React.PropTypes.number
     })),
     width: React.PropTypes.number
   },

   render: function() {
      if (max(this.props.data) === 0){
        return null;
      }

      var chart = ReactFauxDOM.createElement('svg')
      var xAxis = scaleLinear().domain([0, max(this.props.data.map(i => i.value))]).range([0, 1000]);

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
          .attr('dy', -1)
          .text((d) => {
            return d.title;
          });

      bars.append('rect')
         .attr('width', (d) => { return xAxis(d.value); })
         .attr('height', 3)
         .attr('fill', (d, i) => { return i % 2 === 0 ? 'rgba(60,90,150,1)' : '#51A8B5'});

      return chart.toReact();
   }
});

export default SimpleLine;
