const rootRoute = {
   path: '/',
   component: require('../pages/CouchRef').default,
   childRoutes: [
      require('./MatchRoute').default,
      require('./TeamsRoute').default,
      require('./StatsRoute').default,

      require('./SplashRoute').default,
      require('./LoginRoute').default,
      require('./ErrorsRoute').default
   ]
};

export default rootRoute;
