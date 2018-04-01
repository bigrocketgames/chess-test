import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import board from '../board/reducer';
import history from '../history/reducer';
import message from '../message/reducer';

const reducers = combineReducers({
  board,
  history,
  message
})

const middleware = [thunk]

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
)

const store = createStore(
  reducers,
  enhancer
)

export default store;