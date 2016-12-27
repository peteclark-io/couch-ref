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
});

it('Should generate the right score summary.', () => {
   const rendered = mount(
      <MatchRating score={3} />
   );

   expect(rendered.find('.match-rating h2').text()).toEqual('+30');
   expect(rendered.html()).toMatchSnapshot();
});
