import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { weatherReducer } from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  weatherReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof weatherReducer>;