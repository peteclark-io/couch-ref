'use strict';

const PrivateBrowsingRoute = {
  path: '/private-browser',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../pages/banners/PrivateBrowsing').default)
    })
  }
};

export default PrivateBrowsingRoute;
