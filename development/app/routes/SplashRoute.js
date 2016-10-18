'use strict';

const SplashRoute = {
  path: '/splash',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../pages/banners/Splash').default)
    })
  }
};

export default SplashRoute;
