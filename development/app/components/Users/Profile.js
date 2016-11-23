'use strict';

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import buttons from '../Questions/buttons.css';
import styles from './styles.css';

const Profile = React.createClass({

  propTypes: {
    user: React.PropTypes.object
  },

  render: function() {
    return (
      <div>
         <h1 className={styles.brand}>Profile!</h1>
         <h3 className={styles.question}>Your Ref Rating {this.props.user.score.toFixed(0)}</h3>

         <div className={styles['asl-container']}>
         </div>
      </div>
    );
  }
});

const getUser = (state = { user: {} }) => {
  return state.user;
};

const mapStateToProps = (state) => {
   return {
     user: getUser(state)
   };
};

const LiveProfile = connect(
  mapStateToProps
)(Profile);

export default LiveProfile;
