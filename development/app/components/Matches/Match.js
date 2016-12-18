'use strict'

import React from 'react';
import {Link} from 'react-router';
import {ThreeBounce} from 'better-react-spinkit';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import styles from './styles.css';
import QuestionList from '../Questions/QuestionList';
import MatchRating from './MatchRating';
import RefereeRating from './RefereeRating';
import Referee from './Referee';
import MatchHeader from './MatchHeader';

const Match = React.createClass({

   propTypes: {
      match: React.PropTypes.object
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
            {/*<RefereeRating id={this.props.match.id} />*/}
            <QuestionList questions={this.props.match.questions} />
         </div>
      );
   }
});

export default Match;
