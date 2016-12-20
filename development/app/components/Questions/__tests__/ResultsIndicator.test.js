'use strict';

import React from 'react';
import ResultsIndicator from '../ResultsIndicator';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

it('Is null when it has no data.', () => {
   const rendered = mount(
      <ResultsIndicator />
   );
   expect(rendered.html()).toBeNull();
});

it('Writes a graph when it has data.', () => {
   const data = {simple: {yes: 1, no: 1}};
   const rendered = mount(
      <ResultsIndicator statistic={data} />
   );
   expect(rendered.html()).toMatchSnapshot();
});

it('Is null when data is 0.', () => {
   const data = {simple: {yes: 0, no: 0}};
   const rendered = mount(
      <ResultsIndicator statistic={data} />
   );
   expect(rendered.html()).toMatchSnapshot();
});
