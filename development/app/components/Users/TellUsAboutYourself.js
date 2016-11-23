'use strict';

import React from 'react';
import {connect} from 'react-redux';

import styles from './styles.css';

const TellUsAboutYourself = React.createClass({

  render: function() {
    return (
      <div>
         <h1 className={styles.brand}>Tell Us About Yourself!</h1>
         {this.props.children}
      </div>
    );
  }
});

export default TellUsAboutYourself;
