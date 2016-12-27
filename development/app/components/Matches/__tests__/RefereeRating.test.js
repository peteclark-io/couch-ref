'use strict';

import React from 'react';
import RefereeRating from '../RefereeRating';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

it('Is null when it has no data.', () => {
   const rendered = mount(
      <RefereeRating />
   );
   expect(rendered.html()).toBeNull();
});

it('Shows the Ref rating when one is available', () => {
   const rendered = mount(
      <RefereeRating score={5} />
   );
   expect(rendered.html()).toMatchSnapshot();
});
