'use strict'

import { connect } from 'react-redux'
import Scores from './Scores'

const getLiveMatch = (state = {home: 'loading', away: 'loading', home_score: 0, away_score: 0}) => {
  return {
    home: state.home,
    away: state.away,
    goalsHome: state.home_score,
    goalsAway: state.away_score,
  }
}

const mapStateToProps = (state) => {
  return {
    match: getLiveMatch(state)
  }
}


const LiveScores = connect(
  mapStateToProps
)(Scores)

export default LiveScores
