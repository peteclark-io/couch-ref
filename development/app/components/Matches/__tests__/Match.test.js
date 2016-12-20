'use strict';

import React from 'react';
import Match from '../Match';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

import reducer from '../../../ducks/reducers';
import {addMatch, updateMatch} from '../../../ducks/matches';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

it('Displays loader when there is no data.', () => {
   const rendered = mount(
      <Match />
   );

   expect(rendered.find('.loading')).toHaveLength(1);
});

it('Displays match score, with no questions.', () => {
   var match = {id: '1001', home: 'Arsenal', away: 'West Ham', goalsHome: 1, goalsAway: 0, questions: []};
   const rendered = renderer.create(
      <Match match={match} />
   );

   expect(rendered.toJSON()).toMatchSnapshot();
});
