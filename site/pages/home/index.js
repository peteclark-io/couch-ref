/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import styles from './styles.css';

import {init} from '../../core/firebase-setup';

import LiveScores from '../../components/Scores/LiveScores'

class HomePage extends React.Component {

  componentDidMount() {
    init().then(function(val){
      console.log(val);
    });
  }

  render() {
    return (
      <div className={styles.hero}>
        <LiveScores />
      </div>
    );
  }

}

export default HomePage;
