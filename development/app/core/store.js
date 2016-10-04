'use strict';

import { createStore } from 'redux';
import reducer from '../ducks/reducers';

const store = createStore(reducer);

export default store;
