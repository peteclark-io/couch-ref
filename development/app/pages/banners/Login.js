'use strict';

import React from 'react';
import { connect } from 'react-redux';

import firebase from 'firebase';

import styles from './Splash.css';

const Login = React.createClass({

   login: function(){
     var provider = new firebase.auth.GoogleAuthProvider();
     firebase.auth().signInWithRedirect(provider);
   },

   render: function() {
       return (
        <div className={styles.splash}>
           <h1 className={styles.brand}>Couch Ref</h1>
           <div className="g-signin2" dataOnSuccess="onSignIn"></div>
        </div>
      );
    }
});

export default Login;
