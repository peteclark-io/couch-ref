'use strict';

import React from 'react';
import MatchPage from '../MatchPage';
import {shallow, mount} from 'enzyme';

import reducer from '../../../ducks/reducers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

it('Displays loader when there is no data.', () => {
   var store = createStore(reducer);
   var params = {matchId: 1001}
   const rendered = mount(
      <Provider store={store}>
         <MatchPage params={params} />
      </Provider>
   );

   expect(rendered.find('.loading')).toHaveLength(1);
});
