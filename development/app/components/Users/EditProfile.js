'use strict';

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {Link} from 'react-router';

import buttons from '../Questions/buttons.css';
import styles from './styles.css';

export const EditProfile = React.createClass({

   propTypes: {
      user: React.PropTypes.object
   },

   render: function() {
      return (
         <div>
            <h1 className={styles.brand}>Edit Your Profile</h1>
            <h1 className={styles.brand}></h1>
            <div className={styles['asl-container']}>
               <div className={bootstrap.row}>
                  <div className={classNames(styles['edit-section'], bootstrap['cols-xs-6'], bootstrap['col-sm-4'])}>
                     <h3>{this.props.user.birthday.format('DD/MM/YY')}</h3>
                     <Link to={'/users/birthday'}>Edit</Link>
                  </div>
                  <div className={classNames(styles['edit-section'], bootstrap['cols-xs-6'], bootstrap['col-sm-4'])}>
                     <h3>{this.props.user.sex}</h3>
                     <Link to={'/users/sex'}>Edit</Link>
                  </div>
                  <div className={classNames(styles['edit-section'], bootstrap['cols-xs-6'], bootstrap['col-sm-4'])}>
                     <h3>{this.props.user.location}</h3>
                     <Link to={'/users/location'}>Edit</Link>
                  </div>
                  <div className={classNames(styles['edit-section'], bootstrap['cols-xs-12'], bootstrap['col-sm-12'])}>
                     {this.props.user.club.crestUrl ? <h3><img className={styles['edit-club']} src={this.props.user.club.crestUrl}></img></h3> : null}
                     {!this.props.user.club.crestUrl ? <h3>{this.props.user.club.name}</h3> : null}
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

const LiveEditProfile = connect(
   mapStateToProps
)(EditProfile);

export default LiveEditProfile;
