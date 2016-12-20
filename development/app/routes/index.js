'use strict';

import Splash from '../pages/banners/Splash';
import {loadMatch, loadQuestionStatistics} from '../ducks/archive';

const rootRoute = (store) => {
   return {
      childRoutes: [
         {
            path: '/',
            component: require('../pages/CouchRef').default,
            childRoutes: [
               {
                  path: '/match/:matchId',
                  component: require('../pages/sections/MatchPage').default
               },
               {
                  path: '/ratings/:matchId',
                  component: require('../pages/sections/MatchRatingPage').default
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
               {
                  path: '/archive/match/:matchId',
                  component: require('../pages/sections/ArchivedMatchPage').default,
                  onEnter: (next) => {
                     store.dispatch(loadMatch(next.params.matchId));
                  }
               },
               {
                  path: '/archive/question/:questionId',
                  component: require('../pages/sections/ArchivedStatsPage').default,
                  onEnter: (next) => {
                     store.dispatch(loadQuestionStatistics(next.params.questionId));
                  }
               },
               require('./TeamsRoute').default
            ]
         },
         {
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
};

export default rootRoute;
