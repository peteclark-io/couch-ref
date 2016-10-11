'use strict';

import { connect } from 'react-redux';
import TeamSheet from './TeamSheet';
import _ from 'lodash';

const getLiveMatch = (state = {matches: []}, id) => {
   var filtered = _.filter(state.matches, {id: id});
   return filtered.length === 0 ? undefined : filtered[0];
};

const mapStateToProps = (state, ownProps) => {
   return {
     match: getLiveMatch(state, ownProps.id)
   };
};

const LiveTeamSheet = connect(
  mapStateToProps
)(TeamSheet);

export default LiveTeamSheet;
