import { combineReducers } from 'redux';
import count from './counter';
import loginStatus from './loginStatus';

const rootReducer = combineReducers({ count, loginStatus });

export default rootReducer;
