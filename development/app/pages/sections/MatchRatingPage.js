'use strict'

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MatchHeader from '../../components/Matches/MatchHeader';
import MatchRating from '../../components/Matches/MatchRating';

export const MatchRatingPage = React.createClass({

   propTypes: {
      match: React.PropTypes.object
   },

   render: function() {
      return (
         <div>
            <MatchHeader match={this.props.match} />
            <MatchRating id={this.props.match.id} />
         </div>
      );
   }
});

const getLiveMatch = (state = {matches: []}, id) => {
   var filtered = _.filter(state.matches, {id: id});
   return filtered.length === 0 ? undefined : filtered[0];
};

const mapStateToProps = (state, ownProps) => {
   return {
      match: getLiveMatch(state, ownProps.params.matchId)
   };
};

const LiveMatchRatingPage = connect(
   mapStateToProps
)(MatchRatingPage);

export default LiveMatchRatingPage;
