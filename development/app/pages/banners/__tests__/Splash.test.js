'use strict';

import React from 'react';
import {Splash} from '../Splash';
import {mount, shallow} from 'enzyme';

import renderer from 'react-test-renderer';

test('Splash', () => {
   const rendered = shallow(
      <Splash ready={false} />
   );

   let tree = rendered.not('.loading').debug();
   expect(tree).toMatchSnapshot();
});

it('Redirects if ready', () => {
   var routed = false;
   const router = {
      push: (uri) => {
         expect(uri).toEqual('/');
         routed = true;
      }
   };

   const rendered = shallow(
      <Splash ready={true} />,
      {context: {router: router}}
   );

   expect(routed).toBeTruthy();
});

it('Doesn\'t redirect if not ready', () => {
   const router = {
      push: (uri) => {
         expect(false).toBeTruthy(); // aka, fail pls.
      }
   };

   const rendered = shallow(
      <Splash ready={false} />,
      {context: {router: router}}
   );
});
