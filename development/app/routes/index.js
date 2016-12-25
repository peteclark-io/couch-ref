'use strict';

import Splash from '../pages/banners/Splash';
import {browserHistory} from 'react-router';

import {loadArchivedMatch} from '../ducks/matches';
import {loadArchivedQuestion} from '../ducks/questions';
import {loadArchivedStatistic} from '../ducks/statistics';

const getMatch = (store) => {
   return ({params}) => {
      if (!store.getState().matches[params.matchId]){
         store.dispatch(
            loadArchivedMatch(
               params.matchId,
               () => {browserHistory.push('/missing');}
            )
         );
      }
   };
};

const rootRoute = (store) => {
   return {
      childRoutes: [
         {
            path: '/',
            component: require('../pages/CouchRef').default,
            childRoutes: [
               {
                  path: '/match/:matchId',
                  component: require('../pages/sections/MatchPage').default,
                  onEnter: getMatch(store)
               },
               {
                  path: '/ratings/:matchId',
                  component: require('../pages/sections/MatchRatingPage').default,
                  onEnter: getMatch(store)
               },
               {
                  path: '/question/:questionId',
                  component: require('../pages/sections/StatsPage').default,
                  onEnter: ({params}) => {
                     if (!store.getState().statistics[params.questionId]){
                        store.dispatch(
                           loadArchivedQuestion(
                              params.questionId,
                              () => {browserHistory.push('/missing');}
                           )
                        );

                        store.dispatch(
                           loadArchivedStatistic(
                              params.questionId,
                              () => {browserHistory.push('/missing');}
                           )
                        );
                     }
                  }
               },
               {
                  path: '/referees',
                  component: require('../pages/sections/RefereePage').default
               },
               {
                  path: '/score',
                  component: require('../pages/sections/UserScorePage').default,
                  onEnter: () => {
                     var best = store.getState().user.best;
                     var worst = store.getState().user.worst;

                     if (best && !store.getState().questions[best.question]){
                        store.dispatch(loadArchivedQuestion(best.question))
                        store.dispatch(loadArchivedStatistic(best.question))
                     }

                     if (worst && !store.getState().questions[worst.question]){
                        store.dispatch(loadArchivedQuestion(worst.question))
                        store.dispatch(loadArchivedStatistic(worst.question))
                     }
                  }
               },
               require('./TeamsRoute').default
            ]
         },
         {
            path: '/splash',
            component: Splash,
         },
         {
            path: '/missing',
            component: require('../pages/banners/MissingPage').default
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
