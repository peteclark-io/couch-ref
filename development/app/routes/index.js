'use strict';

import Splash from '../pages/banners/Splash';

const rootRoute = {
   childRoutes: [{
         path: '/',
         component: require('../pages/CouchRef').default,
         childRoutes: [
            require('./MatchRoute').default,
            require('./TeamsRoute').default,
            require('./StatsRoute').default
         ]
      }, {
         path: '/splash',
         component: Splash,
      },
      require('./LoginRoute').default,
      require('./ErrorsRoute').default,
      require('./UsersRoute').default
   ]
};

export default rootRoute;
