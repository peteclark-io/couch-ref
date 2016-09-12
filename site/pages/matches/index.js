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
import LiveScores from '../../components/Matches/LiveScores'

class MatchPage extends React.Component {

  componentDidMount() {}

  static propTypes = {
    match: React.PropTypes.shape({
      'id': React.PropTypes.string,
      'kickOff': React.PropTypes.string,
      'home': React.PropTypes.string,
      'away': React.PropTypes.string,
      'goalsHome': React.PropTypes.number,
      'goalsAway': React.PropTypes.number
    })
  };

  render() {
    return (
      <LiveScores />
    );
  }

}

export default MatchPage;
