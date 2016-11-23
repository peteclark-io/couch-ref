'use strict';

import React from 'react';
import {connect} from 'react-redux';

import styles from './UsersPage.css';

const UsersPage = React.createClass({

  render: function() {
    return (
      <div className={styles.splash}>
         {this.props.children}
      </div>
    );
  }
});

export default UsersPage;
