'use strict'

import { connect } from 'react-redux'
import Scores from './Scores'

var matches = [];

const getLiveMatches = (state = {matches: []}) => {
  return state.matches;
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
