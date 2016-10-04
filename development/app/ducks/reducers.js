import { combineReducers } from 'redux';
import matches from './matches';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    matches,
    routing: routerReducer
});

export default rootReducer;
