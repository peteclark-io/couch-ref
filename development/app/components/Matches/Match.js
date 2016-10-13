'use strict'

import React from 'react';
import {Link} from 'react-router';
import {ThreeBounce} from 'better-react-spinkit';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import styles from './styles.css';
import QuestionList from '../Questions/QuestionList';

const Match = React.createClass({

   propTypes: {
     match: React.PropTypes.shape({
         'id': React.PropTypes.string,
         'home': React.PropTypes.string,
         'away': React.PropTypes.string,
         'goalsHome': React.PropTypes.number,
         'goalsAway': React.PropTypes.number,
          'questions': React.PropTypes.arrayOf(
            React.PropTypes.shape({
              id: React.PropTypes.string,
              gid: React.PropTypes.string,
              group: React.PropTypes.string,
              asked: React.PropTypes.string,
              question: React.PropTypes.string,
              time: React.PropTypes.string,
              description: React.PropTypes.string,
              decision: React.PropTypes.string,
              controversial: React.PropTypes.bool,
              refereeDecision: React.PropTypes.bool
            }))
       })
   },

   render: function() {
      if (!this.props.match){
        return (
          <div className={styles.loading}>
            <ThreeBounce />
          </div>
        );
      }

      return (
         <div>
            <div className={bootstrap.row}>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-8'])}>
                  <h2 className={styles['match-header']}>{this.props.match.home} {this.props.match.goalsHome}  -  {this.props.match.goalsAway} {this.props.match.away}</h2>
               </div>
               <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-4'])}>
                  <Link className={styles.link} to={`/teams/${this.props.match.id}`}><h2 className={styles['match-header']}><small>Teams</small></h2></Link>
               </div>
            </div>
            <QuestionList questions={this.props.match.questions} />
         </div>
      );
   }
});

export default Match;
