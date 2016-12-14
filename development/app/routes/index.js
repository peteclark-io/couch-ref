'use strict';

import Splash from '../pages/banners/Splash';

const rootRoute = {
   childRoutes: [{
         path: '/',
         component: require('../pages/CouchRef').default,
         childRoutes: [
            {
              path: '/match/:matchId',
              component: require('../pages/sections/MatchPage').default
            },
            {
              path: '/question/:questionId',
              component: require('../pages/sections/StatsPage').default
            },
            {
              path: '/referees',
              component: require('../pages/sections/RefereePage').default
            },
            {
              path: '/score',
              component: require('../pages/sections/UserScorePage').default
            },
            require('./TeamsRoute').default
         ]
      }, {
         path: '/splash',
         component: Splash,
      },
      require('./LoginRoute').default,
      require('./ErrorsRoute').default,
      require('./UsersRoute').default,
      require('./PrivateBrowsingRoute').default,
      require('./AboutRoute').default
   ]
};

export default rootRoute;
