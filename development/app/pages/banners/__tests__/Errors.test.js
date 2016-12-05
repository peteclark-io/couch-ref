'use strict';

import React from 'react';
import {component} from '../Errors.js';
import renderer from 'react-test-renderer';

test('Errors page won\'t change much.', () => {
   const errors = {
      'auth/made-up-error': {
         code: 'auth/made-up-error',
         message: 'Some made up error.'
      }
   }

   const Errors = component();
   const rendered = renderer.create(
      <Errors errors={errors}/>
   );
   let tree = rendered.toJSON();
   expect(tree).toMatchSnapshot();
});
