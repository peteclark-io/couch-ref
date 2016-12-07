'use strict';

import React from 'react';
import Team from '../Team';
import renderer from 'react-test-renderer';

it('Renders ok.', () => {
   const rendered = renderer.create(
      <Team name={'Arsenal'} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});
