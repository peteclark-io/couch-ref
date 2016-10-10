'use strict';

import React from 'react';
import { connect } from 'react-redux';
import {ThreeBounce} from 'better-react-spinkit';

import styles from './Splash.css';

const Splash = React.createClass({

   propTypes: {
      ready: React.PropTypes.bool
   },

   contextTypes: {
      router: React.PropTypes.object
   },

   componentWillMount: function(){
      this.checkIfReady();
   },

   componentWillUpdate: function(){
      this.checkIfReady();
   },

   checkIfReady: function(){
      if (this.props.ready){
         this.context.router.push('/');
      }
   },

   render: function() {
     return (
      <div className={styles.splash}>
         <h1 className={styles.brand}>Couch Ref</h1>
         <div className={styles.loader}>
            <ThreeBounce color="white" />
         </div>
      </div>
    );
  }
});

const isReady = (state = {ready: false}) => {
   return state.ready;
};

const mapStateToProps = (state) => {
   return {
     ready: isReady(state)
   };
};

const LiveSplash = connect(
  mapStateToProps
)(Splash);

export default LiveSplash;
