'use strict';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import matches from './matches';
import ready from './ready';
import questions from './questions';
import statistics from './statistics';
import votes from './votes';
import authenticated from './authenticated';

const rootReducer = combineReducers({
    matches: matches,
    questions: questions,
    statistics: statistics,
    ready: ready,
    authenticated: authenticated,
    routing: routerReducer,
    votes: votes
});

export default rootReducer;
