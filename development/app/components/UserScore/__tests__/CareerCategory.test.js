'use strict';

import React from 'react';
import {CareerCategory} from '../CareerCategory';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';

it('Renders rankings ok.', () => {
   const rendered = renderer.create(
      <CareerCategory answered={201} score={4000} />
   );

   expect(rendered.toJSON()).toMatchSnapshot();
});
