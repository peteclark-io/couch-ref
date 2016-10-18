'use strict';

const MatchRoute = {
  path: '/match/:matchId',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../pages/sections/MatchPage').default)
    })
  }
};

export default MatchRoute;
