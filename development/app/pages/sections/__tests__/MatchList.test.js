'use strict';

import React from 'react';
import MatchList from '../MatchList';
import {shallow} from 'enzyme';

import {Provider} from 'react-redux';
import store from '../../../core/store';

test('MatchList section', () => {
   const rendered = shallow(
      <Provider store={store}>
         <MatchList />
      </Provider>
   );

   let tree = rendered.debug();
   expect(tree).toMatchSnapshot();
});
