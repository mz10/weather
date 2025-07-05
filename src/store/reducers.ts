import { type WeatherState } from '../types/base';
import { WeatherActions, WeatherActionTypes } from './actions';

const initialState: WeatherState = {

};

export function weatherReducer(state = initialState, action: WeatherActions): WeatherState {
  switch (action.type) {
    default:
      return state;
  }
}