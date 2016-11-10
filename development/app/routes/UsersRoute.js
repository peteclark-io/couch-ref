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
        path: 'birthday',
        component: require('../components/Users/DateOfBirth').default
     },
     {
        path: 'sex',
        component: require('../components/Users/Gender').default
     },
     {
        path: 'location',
        component: require('../components/Users/Location').default
     }
  ]
};

export default UsersRoute;
