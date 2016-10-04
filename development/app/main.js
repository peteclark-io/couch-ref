'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import CouchRef from './pages/CouchRef';
import MatchPage from './pages/MatchPage';

import store from './core/store';
import firebase from './core/firebase';

const container = document.getElementById('container');

firebase(store).init();

FastClick.attach(document.body);

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={CouchRef}>
        <Route path="/match/:matchId" component={MatchPage}>
        </Route>
      </Route>
    </Router>
  </Provider>,
  container
);
