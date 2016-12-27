'use strict';

import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import RefereeHeader from '../../components/Referees/RefereeHeader';
import Ranking from '../../components/Referees/Ranking';
import RecentMatches from '../../components/Referees/RecentMatches';

const RefereePage = React.createClass({

   propTypes: {
      referee: React.PropTypes.object,
      matches: React.PropTypes.object,
      rank: React.PropTypes.object
   },

   render: function() {
      return (
         <div>
            <RefereeHeader referee={this.props.referee} />
            <Ranking rank={this.props.rank.rank} total={this.props.rank.total} />
            <RecentMatches referee={this.props.referee} matches={this.props.matches} scores={this.props.referee.scores} />
         </div>
      );
   }
});

const getReferee = (refId, state = {referees: {}}) => {
   var ref = state.referees[refId];
   return ref ? ref : undefined;
};

const getMatches = (referee, state = {matches: {}}) => {
   if (!referee || !referee.recentMatches){
      return undefined;
   }

   return _.keyBy(referee.recentMatches.map(match => {
      return state.matches[match];
   }).filter(m => m), 'id');
};

const getRank = (refId, state = {referees: {}}) => {
   var sorted = _.reverse(_.sortBy(_.values(state.referees), 'totalScore'));
   return {
      rank: _.findIndex(sorted, ['id', refId]) + 1,
      total: sorted.length
   }
};

const mapStateToProps = (state, ownProps) => {
   var ref = getReferee(ownProps.params.refId, state);
   return {
      referee: ref,
      matches: getMatches(ref, state),
      rank: getRank(ownProps.params.refId, state)
   };
};

const LiveRefereePage = connect(
   mapStateToProps
)(RefereePage);

export default LiveRefereePage;
