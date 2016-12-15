'use strict';

import React from 'react';
import {Ranking} from '../Ranking';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';

it('Renders rankings ok.', () => {
   const rendered = renderer.create(
      <Ranking answered={201} score={4000} />
   );

   expect(rendered.toJSON()).toMatchSnapshot();
});
