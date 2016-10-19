'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import store from './core/store';
import cookies from './core/cookies';
import firebase from './core/firebase';
import routes from './routes';

import {inspectCookies} from './ducks/user';

FastClick.attach(document.body);

const container = document.getElementById('container');
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(inspectCookies(cookies()));

firebase(store).init(history, window.location.pathname);
history.push('/splash'); // move to splash screen - firebase will move to main screen once initialized.

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  container
);
