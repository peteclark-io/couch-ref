'use strict';

import React from 'react';
import {Score} from '../Score';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';

it('Renders score ok.', () => {
   const rendered = renderer.create(
      <Score rank={2} movement={1} />
   );

   expect(rendered.toJSON()).toMatchSnapshot();
});

it('Renders unrated if no ranking.', () => {
   const rendered = renderer.create(
      <Score />
   );

   expect(rendered.toJSON()).toMatchSnapshot();
});
