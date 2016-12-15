'use strict';

import React from 'react';
import { connect } from 'react-redux';

import firebase from 'firebase';

import styles from './Login.css';

export const Login = React.createClass({

   propTypes: {
      authenticated: React.PropTypes.bool,
      firebase: React.PropTypes.object
   },

   contextTypes: {
      router: React.PropTypes.object
   },

   componentWillMount: function(){
      this.checkIfAuthenticated();
   },

   componentWillUpdate: function(){
      this.checkIfAuthenticated();
   },

   checkIfAuthenticated: function(){
      if (this.props.authenticated){
         this.context.router.push('/');
      }
   },

   googleLogin: function(){
     var provider = new firebase.auth.GoogleAuthProvider();
     this.props.firebase.auth().signInWithRedirect(provider);
   },

   facebookLogin: function(){
     var provider = new firebase.auth.FacebookAuthProvider();
     this.props.firebase.auth().signInWithRedirect(provider);
   },

   twitterLogin: function(){
     var provider = new firebase.auth.TwitterAuthProvider();
     this.props.firebase.auth().signInWithRedirect(provider);
   },

   render: function() {
       return (
          <div className={styles.splash}>
             <h1 className={styles.brand}>Couch Ref</h1>
             <h2 className={styles.with}>Login With</h2>
             <div className={styles['auth-providers']}>
                <img alt="Login with your Google Account" id="google" src="/images/auth/google.svg" onClick={this.googleLogin} />
                <img alt="Login with Facebook" id="facebook" className={styles.facebook} src="/images/auth/facebook.png" onClick={this.facebookLogin} />
                <img alt="Login with Twitter" id="twitter" className={styles.facebook} src="/images/auth/twitter.svg" onClick={this.twitterLogin} />
             </div>
          </div>
      );
    }
});

const isAuthenticated = (state = {authenticated: false}) => {
   return state.authenticated;
};

const mapStateToProps = (state) => {
   return {
     authenticated: isAuthenticated(state),
     firebase: firebase
   };
};

const LiveLogin = connect(
  mapStateToProps
)(Login);

export default LiveLogin;
