'use strict';

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {Link} from 'react-router';

import buttons from '../Questions/buttons.css';
import styles from './styles.css';

export const Profile = React.createClass({

   propTypes: {
      user: React.PropTypes.object
   },

   render: function() {
      var score = this.props.user.score;
      if (!score){
         score = 2000;
      }

      return (
         <div>
            <h1 className={styles.brand}>Profile!</h1>
            <h3 className={styles.question}>Your Ref Rating {score.toFixed(0)}</h3>

            <div className={styles['asl-container']}>
               <div className={bootstrap.row}>
                  <div className={classNames(bootstrap['cols-xs-6'], bootstrap['col-sm-4'])}>
                     <h3>{this.props.user.birthday.format('DD/MM/YY')}</h3>
                     <Link to={'/users/birthday'}>Edit</Link>
                  </div>
                  <div className={classNames(bootstrap['cols-xs-6'], bootstrap['col-sm-4'])}>
                     <h3>{this.props.user.sex}</h3>
                     <Link to={'/users/sex'}>Edit</Link>
                  </div>
                  <div className={classNames(bootstrap['cols-xs-6'], bootstrap['col-sm-4'])}>
                     <h3>{this.props.user.location}</h3>
                     <Link to={'/users/location'}>Edit</Link>
                  </div>
                  <div className={classNames(bootstrap['cols-xs-12'], bootstrap['col-sm-12'])}>
                     <h3><img className={styles['edit-club']} src={this.props.user.club.crestUrl}></img></h3>
                     <Link to={'/users/club'}>Edit</Link>
                  </div>
               </div>
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
