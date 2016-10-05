import { combineReducers } from 'redux';
import matches from './matches';
import ready from './ready';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    matches: matches,
    ready: ready,
    routing: routerReducer
});

export default rootReducer;
