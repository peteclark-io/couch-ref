'use strict';

const UsersRoute = {
  path: '/users',

  component: require('../pages/banners/UsersPage').default,

  childRoutes: [
     {
       path: 'club',
       component: require('../components/Users/ClubCrests').default
     },
     {
        path: 'asl',
        component: require('../components/Users/ASL').default
     }
  ]
};

export default UsersRoute;
