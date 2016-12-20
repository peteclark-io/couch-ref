'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import store from './core/store';
import firebase from './core/firebase';
import routes from './routes';

FastClick.attach(document.body);

const container = document.getElementById('container');
const history = syncHistoryWithStore(browserHistory, store);

firebase(store).init(history, window.location.pathname);
history.push('/splash'); // move to splash screen - firebase will move to main screen once initialized.

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history} routes={routes(store)} />
  </Provider>,
  container
);
