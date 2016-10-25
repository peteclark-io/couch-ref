'use strict';

import React from 'react';
import {connect} from 'react-redux';

import styles from './UsersPage.css';

const UsersPage = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    clubs: React.PropTypes.array
  },

  render: function() {
    if (!this.props.user.remote || !this.props.clubs){
      return null;
    }

    return (
      <div className={styles.splash}>
         <h1 className={styles.brand}>Tell Us About Yourself!</h1>
         <h3 className={styles.question}>Who Do You Support?</h3>

         <ul className={styles.clubs}>
            {this.props.clubs.map((c) => {
              return (
                <li key={c.name}>
                  <img src={c.crestUrl} alt={c.name}></img>
                </li>
              );
            })}
         </ul>
      </div>
    );
  }
});


const getUser = (state = {user: {}}, id) => {
  return state.user.remote ? state.user : null;
};

const getClubs = (state = {clubs: []}, id) => {
  return state.clubs.length > 0 ? state.clubs : null;
};

const mapStateToProps = (state) => {
   return {
     user: getUser(state),
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

const LiveUsersPage = connect(
  mapStateToProps
)(UsersPage);

export default LiveUsersPage;
