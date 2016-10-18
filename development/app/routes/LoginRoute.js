'use strict';

const LoginRoute = {
  path: '/login',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../pages/banners/Login').default)
    })
  }
};

export default LoginRoute;
