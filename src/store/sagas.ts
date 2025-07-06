import { call, put, takeLatest, all } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import type { WeatherRecord } from '../types/base';

import {
  WeatherActionTypes,
  loadWeatherSuccess,
  loadWeatherFailure,
} from './actions';

import { loadWeatherApi } from '../services/weatherService';

function* loadWeatherSaga(action: { type: string; payload: number }): SagaIterator {
  try {
    const data: WeatherRecord = yield call(loadWeatherApi, action.payload);
    yield put(loadWeatherSuccess(data));
  } 
  catch (e: any) {
    yield put(loadWeatherFailure(e.message));
  }
}

function* watchWeatherRequest() {
  yield takeLatest(WeatherActionTypes.LOAD_WEATHER_REQUEST, loadWeatherSaga);
}

export default function* rootSaga() {
  yield all([watchWeatherRequest()]);
}
