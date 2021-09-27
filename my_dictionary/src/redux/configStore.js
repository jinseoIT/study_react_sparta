import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import word from './modules/word';

const middlewares = [thunk];
const rootReducer = combineReducers({ word });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;