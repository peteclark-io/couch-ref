'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import styles from './UsersPage.css';

const UsersPage = React.createClass({

  render: function() {
    return (
      <div>
         <div className={styles.splash}>
            {/*<div className={styles.back}>
               <Link to={'/'}><h1>Back</h1></Link>
            </div>*/}
            {this.props.children}
         </div>
      </div>
    );
  }
});

export default UsersPage;
