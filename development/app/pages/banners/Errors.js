'use strict';

import React from 'react';
import {connect} from 'react-redux';
import styles from './Errors.css';

const Errors = React.createClass({

   propTypes: {
      errors: React.PropTypes.object
   },

   render: function() {
      var codes = Object.keys(this.props.errors);
      var error = undefined;
      if (codes.length > 0){
         error = this.props.errors[codes[0]];
      }

      return (
         <div className={styles.splash}>
            <h1 className={styles.error}>Oh No!</h1>
            <h3 className={styles.message}>Something went wrong! Please refresh the page. <span className={styles.emoji}>😫</span></h3>
            {
               error ?
               <div>
                  <h5 className={styles.message}>For the developers...</h5>
                  <h5 className={styles.message}>{error.code}: {error.message}</h5>
               </div>
               : null
            }
         </div>
      );
   }
});

const getErrors = (state = {errors: {}}) => {
   return state.errors;
};

const mapStateToProps = (state) => {
   return {
      errors: getErrors(state)
   };
};

const LiveErrors = connect(
   mapStateToProps
)(Errors);

export function component(){
   return Errors;
}

export default LiveErrors;
