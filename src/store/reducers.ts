import { type WeatherState } from '../types/base';
import { type WeatherActions, WeatherActionTypes } from './actions';

const defaultState: WeatherState = {
  selectedCity: null,
  weather: [],
  loading: false,
  error: null,
};

export function weatherReducer(state = defaultState, action: WeatherActions): WeatherState {
  switch (action.type) {
    default:
      return state;
  }
}