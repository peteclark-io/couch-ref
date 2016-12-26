'use strict';

import React from 'react';
import MatchRating from '../MatchRating';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

import {matchScore} from '../../../core/scores';

it('Is null when it has no data.', () => {
   const rendered = mount(
      <MatchRating />
   );
   expect(rendered.html()).toBeNull();

   rendered.setProps({match: {id: 'id'}})
   expect(rendered.html()).toBeNull();

   rendered.setProps({user: {uid: 'uid'}})
   expect(rendered.html()).toBeNull();
});

it('Should be null when votes is undefined.', () => {
   var match = {id: '1001', home: 'Arsenal', away: 'West Ham', goalsHome: 1, goalsAway: 0, questions: [{id: 'qid'}]};
   var user = {votes: null}
   const rendered = renderer.create(
      <MatchRating match={match} user={user} />
   );

   expect(rendered.toJSON()).toBeNull();
});

it('Should be null when there are no votes.', () => {
   var match = {id: '1001', home: 'Arsenal', away: 'West Ham', goalsHome: 1, goalsAway: 0, questions: [{id: 'qid'}]};
   var user = {votes: {}}
   const rendered = renderer.create(
      <MatchRating match={match} user={user} />
   );

   expect(rendered.toJSON()).toBeNull();
});

it('Should be null when there are no votes for the questions relating to this match.', () => {
   var match = {id: '1001', home: 'Arsenal', away: 'West Ham', goalsHome: 1, goalsAway: 0, questions: [{id: 'qid'}]};
   var user = {votes: {qid2: {score: 1}}}
   const rendered = renderer.create(
      <MatchRating match={match} user={user} />
   );

   expect(rendered.toJSON()).toBeNull();
});

it('Should generate the right score summary.', () => {
   var match = {id: '1001', home: 'Arsenal', away: 'West Ham', goalsHome: 1, goalsAway: 0, questions: [{id: 'qid'}, {id: 'qid2'}, {id: 'qid3'}]};
   var user = {votes: {qid: {score: 1}, qid2: {score: 1}, qid3: {score: 1}}}
   const rendered = mount(
      <MatchRating match={match} user={user} />
   );

   expect(rendered.find('.match-rating h2').text()).toEqual('+30');
   expect(rendered.html()).toMatchSnapshot();
});
