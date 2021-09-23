import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import quiz from './modules/quiz';
import user from './modules/user';
import rank from './modules/rank';

const middlewares = [thunk];
const rootReducer = combineReducers({ quiz, user, rank });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;