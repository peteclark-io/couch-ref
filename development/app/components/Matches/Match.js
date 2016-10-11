'use strict'

import React from 'react';
import {Link} from 'react-router';
import {ThreeBounce} from 'better-react-spinkit';

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
              decision: React.PropTypes.string
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
            <h2 className={styles['match-header']}>{this.props.match.home} {this.props.match.goalsHome}  -  {this.props.match.goalsAway} {this.props.match.away}</h2>
            <Link className={styles.link} to={`/teams/${this.props.match.id}`}><h3>Teams</h3></Link>
            <QuestionList questions={this.props.match.questions} />
         </div>
      );
   }
});

export default Match;
