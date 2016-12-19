'use strict';

import React from 'react';
import {Ranking} from '../Ranking';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';

it('Renders score ok.', () => {
   const rendered = renderer.create(
      <Ranking rank={2} movement={1} />
   );

   expect(rendered.toJSON()).toMatchSnapshot();
});

it('Renders unrated if no ranking.', () => {
   const rendered = renderer.create(
      <Ranking />
   );

   expect(rendered.toJSON()).toMatchSnapshot();
});
