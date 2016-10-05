'use strict'

import { connect } from 'react-redux';
import Match from './Match';
import _ from 'lodash';

var matches = [];

const getLiveMatch = (state = {matches: []}, id) => {
   var filtered = _.filter(state.matches, {id: id});
   return filtered.length === 0 ? undefined : filtered[0];
};

const mapStateToProps = (state, ownProps) => {
   console.log(ownProps);
   return {
     match: getLiveMatch(state, ownProps.id)
   };
};

const LiveMatch = connect(
  mapStateToProps
)(Match);

export default LiveMatch;
