'use strict';

import React from 'react';
import Version from '../Version.js';
import renderer from 'react-test-renderer';

test('Version matches the version.json file.', () => {
  const component = renderer.create(
    <Version />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
