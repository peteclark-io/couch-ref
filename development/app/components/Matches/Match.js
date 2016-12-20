'use strict'

import React from 'react';
import {Link} from 'react-router';
import {ThreeBounce} from 'better-react-spinkit';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import styles from './styles.css';

import Referee from './Referee';
import QuestionList from '../Questions/QuestionList';
import ScoresReady from './ScoresReady';
import MatchHeader from './MatchHeader';

const Match = React.createClass({

   propTypes: {
      archive: React.PropTypes.bool,
      match: React.PropTypes.object,
      questions: React.PropTypes.object,
      statistics: React.PropTypes.object,
      referee: React.PropTypes.object,
      user: React.PropTypes.object,
      vote: React.PropTypes.func,
      scoresReady: React.PropTypes.bool
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
            <MatchHeader match={this.props.match} />
            <Referee referee={this.props.referee} />
            <ScoresReady match={this.props.match} ready={this.props.scoresReady} />
            <QuestionList
               archive={this.props.archive}
               user={this.props.user}
               vote={(vote, question) => {
                  this.props.vote(vote, question, this.props.user);
               }}
               list={this.props.match.questions}
               questions={this.props.questions}
               statistics={this.props.statistics} />
         </div>
      );
   }
});

export default Match;
