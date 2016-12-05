'use strict';

import React from 'react';
import UsersPage from '../UsersPage.js';
import renderer from 'react-test-renderer';

test('UsersPage shouldn\'t change much.', () => {
   const component = renderer.create(
      <UsersPage children={<h1>hi!</h1>} />
   );

   let tree = component.toJSON();
   expect(tree).toMatchSnapshot();
});
