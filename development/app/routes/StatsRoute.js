'use strict';

const StatsRoute = {
  path: '/question/:questionId',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../pages/sections/StatsPage').default)
    })
  }
};

export default StatsRoute;
