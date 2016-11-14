'use strict';

import React from 'react';
import {connect} from 'react-redux';

import ClubCrests from '../../components/Users/ClubCrests';
import styles from './UsersPage.css';

const UsersPage = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    location: React.PropTypes.object
  },

  contextTypes: {
     router: React.PropTypes.object
  },

  componentWillMount: function(){
     this.checkRoute();
  },

  componentWillUpdate: function(){
     this.checkRoute();
  },

  checkRoute: function(){
     var path = this.props.location.pathname.replace(/\/$/, '');
     if (path === '/users'){
       this.context.router.push('/users/club');
     }
  },

  render: function() {
    if (!this.props.user){
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
  return state.user ? state.user : null;
};

const mapStateToProps = (state, ownProps) => {
   return {
     user: getUser(state),
     location: ownProps.location
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
