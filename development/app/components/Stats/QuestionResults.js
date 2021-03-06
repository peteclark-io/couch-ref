'use strict';

import React from 'react';

import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {ThreeBounce} from 'better-react-spinkit';

import styles from './styles.css';
import OverallChart from './OverallChart';
import OverallCharts from './OverallCharts';
import Verdict from './Verdict';
import Highlight from './Highlight';
import ClubsBreakdown from './ClubsBreakdown';

const QuestionResults = React.createClass({

   propTypes: {
      clubs: React.PropTypes.array,
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
      }),
      question: React.PropTypes.shape({
         id: React.PropTypes.string,
         question: React.PropTypes.string,
         controversial: React.PropTypes.bool,
         asked: React.PropTypes.string,
         time: React.PropTypes.string,
         description: React.PropTypes.string,
         decision: React.PropTypes.string
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

      return (
         <div>
            <h1 className={styles.header}>{this.props.question.question}</h1>
            <Verdict match={this.props.match} results={this.props.results} />
            {
               this.props.question.decision !== '' ?
               <h4 className={styles.referee}>Referee Decision: <span className={styles.decision}>{this.props.question.decision}</span></h4>
               : undefined
            }
            <div className={bootstrap.row}>
               {/**<div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-8'])}>
                  <div className={bootstrap.row}>
                     <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-12'])}>
                        <Verdict match={this.props.match} results={this.props.results} />
                     </div>
                  </div>
               </div>*/}
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-12'])}>
                  <OverallCharts match={this.props.match} results={this.props.results} />
               </div>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-12'])}>
                  <Highlight
                     clubs={this.props.clubs}
                     age={this.props.results.breakdown.age}
                     sex={this.props.results.breakdown.sex}
                     location={this.props.results.breakdown.location}
                     club={this.props.results.breakdown.club} />
               </div>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-12'], styles.clubs)}>
                  <h3>How the fans voted!</h3>
                  <ClubsBreakdown
                     clubs={this.props.clubs}
                     clubData={this.props.results.breakdown.club} />
               </div>
            </div>
         </div>
      );
   }
});

export default QuestionResults;
