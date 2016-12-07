'use strict';

import React from 'react';
import TellUsAboutYourself from '../TellUsAboutYourself';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';

it('Renders.', () => {
   const rendered = renderer.create(
      <TellUsAboutYourself />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});

it('Renders children.', () => {
   const rendered = renderer.create(
      <TellUsAboutYourself children={<h1>hi</h1>} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});
