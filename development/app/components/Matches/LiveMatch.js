'use strict'

import { connect } from 'react-redux';
import Match from './Match';
import _ from 'lodash';

var matches = [];

const getLiveMatch = (state = {matches: []}, id) => {
   console.log('hi');
  return _.filter(state.matches, {id: id})[0];
};

const mapStateToProps = (state, ownProps) => {
   console.log(ownProps.location);
  return {
    match: getLiveMatch(state, 'match1')
  }
};

const LiveMatch = connect(
  mapStateToProps
)(Match);

export default LiveMatch;
