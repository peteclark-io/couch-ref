'use strict';

import React from 'react';
import PrivateBrowsing from '../PrivateBrowsing';
import renderer from 'react-test-renderer';

test('PrivateBrowsing.', () => {
  const component = renderer.create(
    <PrivateBrowsing />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
