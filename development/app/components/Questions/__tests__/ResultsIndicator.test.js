'use strict';

import React from 'react';
import {ResultsIndicator} from '../ResultsIndicator';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

it('Is null when it has no data.', () => {
   const rendered = mount(
      <ResultsIndicator />
   );
   expect(rendered.html()).toBeNull();
});
