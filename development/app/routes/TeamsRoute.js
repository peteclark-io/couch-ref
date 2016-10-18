'use strict';

const TeamsRoute = {
  path: '/teams/:matchId',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../pages/sections/TeamSheetPage').default)
    })
  }
};

export default TeamsRoute;
