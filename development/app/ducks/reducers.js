import { combineReducers } from 'redux';
import matches from './matches';
import ready from './ready';
import authenticated from './authenticated';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    matches: matches,
    ready: ready,
    authenticated: authenticated,
    routing: routerReducer
});

export default rootReducer;
