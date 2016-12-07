'use strict';

import React from 'react';
import TeamSheetPage from '../TeamSheetPage';
import {shallow} from 'enzyme';

import {Provider} from 'react-redux';
import store from '../../../core/store';

test('TeamSheetPage section', () => {
   var params = {matchId: 1001}
   const rendered = shallow(
      <Provider store={store}>
         <TeamSheetPage params={params} />
      </Provider>
   );

   let tree = rendered.debug();
   expect(tree).toMatchSnapshot();
});
