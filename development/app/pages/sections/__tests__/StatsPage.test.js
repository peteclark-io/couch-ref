'use strict';

import React from 'react';
import StatsPage from '../StatsPage';
import {shallow} from 'enzyme';

import {Provider} from 'react-redux';
import store from '../../../core/store';

test('StatsPage section', () => {
   var params = {questionId: 1201}
   const rendered = shallow(
      <Provider store={store}>
         <StatsPage params={params} />
      </Provider>
   );

   let tree = rendered.debug();
   expect(tree).toMatchSnapshot();
});
