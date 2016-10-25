'use strict';

const UsersRoute = {
  path: '/user',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../pages/banners/UsersPage').default)
    })
  }
};

export default UsersRoute;
