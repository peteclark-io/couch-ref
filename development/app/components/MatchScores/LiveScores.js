'use strict'

import _ from 'lodash';
import { connect } from 'react-redux'
import Scores from './Scores'

const getLiveMatches = (state = {matches: {}}) => {
  return _.values(state.matches);
}

const mapStateToProps = (state) => {
  return {
    matches: getLiveMatches(state)
  }
}

const LiveScores = connect(
  mapStateToProps
)(Scores)

export default LiveScores
