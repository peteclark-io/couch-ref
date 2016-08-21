import { connect } from 'react-redux'
//import { toggleTodo } from '../actions'
import Scores from './Scores'

const getLiveMatch = (state) => {
   return state;
}

const mapStateToProps = (state) => {
  return {
    match: getLiveMatch(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    /*onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }*/
  }
}

const LiveScores = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scores)

export default LiveScores
