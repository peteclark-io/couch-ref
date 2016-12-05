'use strict';

const AboutRoute = {
  path: '/version',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../pages/banners/Version').default)
    })
  }
};

export default AboutRoute;
