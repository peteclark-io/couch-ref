'use strict'

import React from 'react';
import {connect} from 'react-redux'
import classNames from 'classnames';

import styles from './styles.css';

export const RefereeCareer = React.createClass({

   propTypes: {
      answered: React.PropTypes.number
   },

   render: function() {
      var career = 'Fledgling Referee';
      if (this.props.answers > 10000){
         career = 'Legendary Referee';
      } else if (this.props.answers > 8000) {
         career = 'Battle-Hardened Referee';
      } else if (this.props.answers > 4000) {
         career = 'Experienced Referee';
      } else if (this.props.answers > 1000) {
         career = 'Senior Referee';
      } else if (this.props.answers > 200) {
         career = 'Junior Referee';
      }

      return (
         <div>
            <div className={classNames(styles.container, styles.career)}>
               <h1 className={styles.heading}>{career}</h1>
            </div>
            <div className={classNames(styles.container, styles.answered)}>
               <h1 className={styles.heading}>Questions Answered</h1>
               <h2 className={styles.value}>{this.props.answered.toFixed(0)}</h2>
            </div>
         </div>
      );
   }
});

const getAnswered = (state = {user: {}}) => {
   return state.user.answered ? state.user.answered : 0;
}

const mapStateToProps = (state) => {
   return {
      answered: getAnswered(state)
   }
}

const LiveRefereeCareer = connect(
   mapStateToProps
)(RefereeCareer)

export default LiveRefereeCareer
