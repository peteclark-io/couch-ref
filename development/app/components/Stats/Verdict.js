'use strict';

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {ThreeBounce} from 'better-react-spinkit';
import {verdict} from '../../core/magic';

import styles from './styles.css';

const Verdict = React.createClass({

  propTypes: {
    match: React.PropTypes.shape({
      home: React.PropTypes.string,
      away: React.PropTypes.string
    }),
    results: React.PropTypes.shape({
       id: React.PropTypes.string,
       breakdown: React.PropTypes.object,
       simple: React.PropTypes.shape({
         yes: React.PropTypes.number,
         no: React.PropTypes.number
       })
    })
  },

  render: function() {
    if (!this.props.results || !this.props.match){
      return (
        <div className={styles.loading}>
          <ThreeBounce />
        </div>
      );
    }

    var v = verdict(this.props.match, this.props.results);
    console.log('Verdict', v);

    return (
      <div className={bootstrap.row}>
        <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-12'])}>
          <h3 className={styles['verdict-header']}>Verdict</h3>
          <h1 className={styles.verdict}>{v.verdict}</h1>
          <h4 className={styles.confidence}>Confidence Score: <span className={styles['confidence-score']}>{v.confidence}</span></h4>
        </div>
      </div>
    );
  }
});

export default Verdict;
