'use strict'

import React from 'react';
import {Link} from 'react-router';
import {ThreeBounce} from 'better-react-spinkit';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import styles from './styles.css';
import QuestionList from '../Questions/QuestionList';
import ScoresReady from './ScoresReady';
import MatchHeader from './MatchHeader';

const Match = React.createClass({

   propTypes: {
      match: React.PropTypes.object,
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
            <ScoresReady match={this.props.match} ready={this.props.scoresReady} />
            <QuestionList questions={this.props.match.questions} />
         </div>
      );
   }
});

export default Match;
