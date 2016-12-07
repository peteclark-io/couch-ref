'use strict';

import React from 'react';
import LiveMatch from '../LiveMatch';
import {shallow, mount} from 'enzyme';

import reducer from '../../../ducks/reducers';
import {addMatch, updateMatch} from '../../../ducks/matches';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

it('Displays loader when there is no data.', () => {
   var store = createStore(reducer);
   const rendered = mount(
      <Provider store={store}>
         <LiveMatch id={'1001'} />
      </Provider>
   );

   expect(rendered.find('.loading')).toHaveLength(1);
});

it('Displays loader when there is no good data.', () => {
   var store = createStore(reducer);
   const rendered = mount(
      <Provider store={store}>
         <LiveMatch id={'1001'} />
      </Provider>
   );

   var match = {id: '1002', home: 'Arsenal', away: 'West Ham', goalsHome: 1, goalsAway: 0, questions: []};
   store.dispatch(addMatch(match));

   expect(rendered.find('.loading')).toHaveLength(1);
});

it('Displays something else when there is data, but no questions.', () => {
   var store = createStore(reducer);
   const rendered = mount(
      <Provider store={store}>
         <LiveMatch id={'1001'} />
      </Provider>
   );

   var match = {id: '1001', home: 'Arsenal', away: 'West Ham', goalsHome: 1, goalsAway: 0, questions: []};
   store.dispatch(addMatch(match));

   expect(rendered.html()).toMatchSnapshot();
});

it('Changes the score.', () => {
   var store = createStore(reducer);
   const rendered = mount(
      <Provider store={store}>
         <LiveMatch id={'1001'} />
      </Provider>
   );

   var match = {id: '1001', home: 'Arsenal', away: 'West Ham', goalsHome: 1, goalsAway: 0, questions: []};
   store.dispatch(addMatch(match));

   expect(rendered.html()).toMatchSnapshot();

   match = Object.assign({}, match, {goalsHome: 2})
   store.dispatch(updateMatch(match));

   expect(rendered.html()).toMatchSnapshot();
});
