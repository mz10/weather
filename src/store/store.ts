import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { weatherReducer } from './reducers';

export const store = createStore(
  weatherReducer,
);

export type RootState = ReturnType<typeof weatherReducer>;