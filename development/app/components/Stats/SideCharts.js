'use strict';

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './styles.css';
import OverallChart from './OverallChart';

const SideCharts = React.createClass({

  propTypes: {
    match: React.PropTypes.shape({
      home: React.PropTypes.string,
      away: React.PropTypes.string
    }),
    results: React.PropTypes.shape({
       id: React.PropTypes.string,
       simple: React.PropTypes.shape({
         yes: React.PropTypes.number,
         no: React.PropTypes.number
       }),
       breakdown: React.PropTypes.object
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

      var homeBreakdown = this.props.results.breakdown.club[this.props.match.home];
      var awayBreakdown = this.props.results.breakdown.club[this.props.match.away];
      
      var away = {
        yes: awayBreakdown ? awayBreakdown.yes : 0,
        no: awayBreakdown ? awayBreakdown.no : 0
      };

      var home = {
        yes: homeBreakdown ? homeBreakdown.yes : 0,
        no: homeBreakdown ? homeBreakdown.no : 0
      };

      return (
        <div className={bootstrap.row}>
          <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-12'])}>
            <h3 className={styles.overall}>Overall</h3>
            <OverallChart
              yes={this.props.results.simple.yes}
              no={this.props.results.simple.no} />
          </div>

          <div className={classNames(bootstrap['col-xs-6'], bootstrap['col-sm-12'])}>
            <h3 className={styles.overall}>Home Fans</h3>
            <OverallChart
              yes={home.yes}
              no={home.no} />
          </div>

          <div className={classNames(bootstrap['col-xs-6'], bootstrap['col-sm-12'])}>
            <h3 className={styles.overall}>Away Fans</h3>
            <OverallChart
              yes={away.yes}
              no={away.no} />
          </div>
        </div>
      );
  }
});

export default SideCharts;
