'use strict';

import React from 'react';
import {connect} from 'react-redux';

import ClubCrests from '../../components/Users/ClubCrests';
import styles from './UsersPage.css';

const UsersPage = React.createClass({

  propTypes: {
    user: React.PropTypes.object
  },

  render: function() {
    if (!this.props.user.remote){
      return null;
    }

    return (
      <div className={styles.splash}>
         <h1 className={styles.brand}>Tell Us About Yourself!</h1>
         {this.props.children}
      </div>
    );
  }
});

const getUser = (state = {user: {}}, id) => {
  return state.user.remote ? state.user : null;
};

const mapStateToProps = (state) => {
   return {
     user: getUser(state)
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
