'use strict';

const ErrorsRoute = {
  path: '/error',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../pages/banners/Errors').default)
    })
  }
};

export default ErrorsRoute;
