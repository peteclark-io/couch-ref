'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import store from './core/store';
import firebase from './core/firebase';

FastClick.attach(document.body);

const container = document.getElementById('container');
const history = syncHistoryWithStore(browserHistory, store);

firebase(store).init(history, window.location.pathname);
history.push('/splash'); // move to splash screen - firebase will move to main screen once initialized.

const rootRoute = {
   path: '/',
   component: require('./pages/CouchRef').default,
   childRoutes: [
      require('./routes/MatchRoute').default,
      require('./routes/TeamsRoute').default,
      require('./routes/StatsRoute').default,

      require('./routes/SplashRoute').default,
      require('./routes/LoginRoute').default,
      require('./routes/ErrorsRoute').default
   ]
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={rootRoute} />
  </Provider>,
  container
);
