'use strict';

import React from 'react';
import {Score} from '../Score';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';

it('Renders score ok.', () => {
   const rendered = renderer.create(
      <Score score={4000.1123} />
   );

   expect(rendered.toJSON()).toMatchSnapshot();
});
