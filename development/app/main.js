'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import CouchRef from './pages/CouchRef';
import Match from './pages/Match';

import store from './core/store';
import firebase from './core/firebase';

const container = document.getElementById('container');

firebase(store).init();

FastClick.attach(document.body);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={CouchRef}>
        <Route path="/match/:matchId" component={Match}>
        </Route>
      </Route>
    </Router>
  </Provider>,
  container
);
