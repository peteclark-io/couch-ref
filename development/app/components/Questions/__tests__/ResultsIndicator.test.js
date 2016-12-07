'use strict';

import React from 'react';
import {ResultsIndicator} from '../ResultsIndicator';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

it('Is null when it has no data.', () => {
   const rendered = mount(
      <ResultsIndicator />
   );
   expect(rendered.html()).toBeNull();
});

it('Writes a graph when it has data.', () => {
   const data = [{title: 'Yes', value: 50}, {title: 'No', value: 10}]
   const rendered = mount(
      <ResultsIndicator data={data} />
   );
   expect(rendered.html()).toMatchSnapshot();
});

it('Is null when data is 0.', () => {
   const data = [{title: 'Yes', value: 0}, {title: 'No', value: 0}]
   const rendered = mount(
      <ResultsIndicator data={data} />
   );
   expect(rendered.html()).toMatchSnapshot();
});
