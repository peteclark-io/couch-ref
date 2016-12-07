'use strict';

import React from 'react';
import RefereePage from '../RefereePage';
import {shallow} from 'enzyme';

import {Provider} from 'react-redux';
import store from '../../../core/store';

test('RefereePage section', () => {
   const rendered = shallow(
      <Provider store={store}>
         <RefereePage />
      </Provider>
   );

   let tree = rendered.debug();
   expect(tree).toMatchSnapshot();
});
