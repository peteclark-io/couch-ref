'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import Splash from './pages/Splash';
import CouchRef from './pages/CouchRef';
import MatchPage from './pages/MatchPage';

import store from './core/store';
import firebase from './core/firebase';

FastClick.attach(document.body);

const container = document.getElementById('container');
const history = syncHistoryWithStore(browserHistory, store);

firebase(store).init(history);
history.push('/splash'); // move to splash screen - firebase will move to main screen once initialized.

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={CouchRef}>
        <Route path="/match/:matchId" component={MatchPage}>
        </Route>
      </Route>
      <Route path="/splash" component={Splash} />
    </Router>
  </Provider>,
  container
);
