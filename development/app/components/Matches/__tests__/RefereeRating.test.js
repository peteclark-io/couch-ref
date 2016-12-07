'use strict';

import React from 'react';
import {RefereeRating} from '../RefereeRating';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

import {matchScore} from '../../../core/scores';

it('Is null when it has no data.', () => {
   const rendered = mount(
      <RefereeRating />
   );
   expect(rendered.html()).toBeNull();

   rendered.setProps({match: {id: 'matchid'}})
   expect(rendered.html()).toBeNull();

   rendered.setProps({referee: {id: 'ref', scores: {}}})
   expect(rendered.html()).toBeNull();

   rendered.setProps({match: {id: 'matchid'}, referee: {id: 'ref', scores: {}}})
   expect(rendered.html()).toBeNull();
});

it('Shows the Ref rating when one is available', () => {
   const match = {id: 'matchid'}
   const referee = {scores: {matchid: 5}}

   const rendered = mount(
      <RefereeRating match={match} referee={referee} />
   );
   expect(rendered.html()).toMatchSnapshot();
});
