'use strict'

import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux'

import Fixtures from '../../components/MatchScores/Fixtures';
import RecentFixtures from '../../components/MatchScores/RecentFixtures';

export const MatchList = React.createClass({

   propTypes: {
      title: React.PropTypes.string,
      fixtures: React.PropTypes.array,
      recentFixtures: React.PropTypes.array
   },

   render: function() {
      return (
         <div>
            <Fixtures title={this.props.title} fixtures={this.props.fixtures} />
            <RecentFixtures fixtures={this.props.recentFixtures} />
         </div>
      );
   }
});

const getRecentFixtures = (yesterday, state = {matches: {}}) => {
   var fixtures = _.values(state.matches);

   return _.reverse(_.sortBy(_.filter(fixtures, i => {
      return i.kickOff.isBefore(yesterday) && i.televised && i.live;
   }), ['kickOff']));
}

const getFixtures = (today, yesterday, state = {matches: {}}) => {
   var matches = _.values(state.matches);

   var todaysFixtures = _.filter(matches, (i) => {
      return i.kickOff.isBefore(today) && i.kickOff.isAfter(yesterday) && i.televised;
   });

   var title = 'Upcoming Fixtures';
   var fixtures = [];
   if (todaysFixtures.length > 0){
      fixtures = todaysFixtures;
      title = 'Today\'s Fixtures';
   } else {
      fixtures = _.filter(matches, (i) => {
         return i.kickOff.isAfter(today) && i.televised;
      });
   }

   fixtures = _.sortBy(fixtures, ['fullTime', 'kickOff']);
   return {title: title, fixtures: fixtures};
};

const mapStateToProps = (state) => {
   var today = moment(24, 'HH'); // midnight tonight
   var yesterday = moment(24, 'HH').subtract(1, 'days'); // midnight last night
   var fixtures = getFixtures(today, yesterday, state);

   return {
      fixtures: fixtures.fixtures,
      title: fixtures.title,
      recentFixtures: getRecentFixtures(yesterday, state)
   }
};

const LiveMatchList = connect(
   mapStateToProps
)(MatchList);

export default LiveMatchList;
