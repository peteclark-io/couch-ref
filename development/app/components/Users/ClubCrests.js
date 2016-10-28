'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {ThreeBounce} from 'better-react-spinkit';

import styles from './styles.css';

const ClubCrests = React.createClass({

  propTypes: {
    clubs: React.PropTypes.array
  },

  render: function() {
    if (!this.props.clubs){
      return (
         <div className={styles.loading}>
           <ThreeBounce color="white" />
         </div>
      );
    }

    return (
      <div>
         <h3 className={styles.question}>Who Do You Support?</h3>
         <div className={styles['clubs-container']}>
         <ul className={styles.clubs}>
         {this.props.clubs.map((c) => {
            return (
               <li key={c.name}>
               <img src={c.crestUrl} alt={c.name} onClick={() => {
                  console.log('click!')
               }}></img>
               </li>
            );
         })}
         </ul>
         </div>
      </div>
    );
  }
});

const getClubs = (state = {clubs: []}, id) => {
  return state.clubs.length > 0 ? state.clubs : null;
};

const mapStateToProps = (state) => {
   return {
     clubs: getClubs(state)
   };
};

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (question, result) => {
      saveVote(question, result);
      dispatch(vote(question, result));
    }
  }
};

const LiveClubCrests = connect(
  mapStateToProps
)(ClubCrests);

export default LiveClubCrests;
