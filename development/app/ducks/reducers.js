'use strict';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import matches from './matches';
import ready from './ready';
import questions from './questions';
import statistics from './statistics';
import user from './user';
import authenticated from './authenticated';
import clubs from './clubs';
import referees from './referees';
import errors from './errors';

const rootReducer = combineReducers({
    matches: matches,
    questions: questions,
    statistics: statistics,
    ready: ready,
    authenticated: authenticated,
    routing: routerReducer,
    user: user,
    clubs: clubs,
    referees: referees,
    errors: errors
});

export default rootReducer;
