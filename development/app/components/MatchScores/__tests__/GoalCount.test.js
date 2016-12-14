'use strict';

import React from 'react';
import GoalCount from '../GoalCount';
import renderer from 'react-test-renderer';

it('Renders ok.', () => {
   const rendered = renderer.create(
      <GoalCount goals={4} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});
