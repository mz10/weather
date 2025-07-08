import type { WeatherState } from '../types/base';
import { WeatherActionTypes } from './actions';
import type { WeatherActions } from './actions';

const defaultState: WeatherState = {
  selectedCity: null,
  weather: [],
  weatherPoints: [],
  loading: false,
  citiesLoading: false,
  error: null,
};

export function weatherReducer(state = defaultState, action: WeatherActions): WeatherState {
  switch (action.type) {
    case WeatherActionTypes.SELECT_CITY:
      return { ...state, selectedCity: action.payload, loading: true, error: null };
    case WeatherActionTypes.LOAD_CITIES_REQUEST:
      return { ...state, citiesLoading: true, error: null };
    case WeatherActionTypes.LOAD_CITIES_SUCCESS:
      return { ...state, citiesLoading: false };
    case WeatherActionTypes.LOAD_CITIES_FAILURE:
      return { ...state, citiesLoading: false, error: action.payload };
    case WeatherActionTypes.LOAD_WEATHER_REQUEST:
      return { ...state, loading: true, error: null };
    case WeatherActionTypes.LOAD_WEATHER_SUCCESS:
      return { 
        ...state, 
        weather: action.payload.daily, 
        weatherPoints: action.payload.hourly,
        loading: false 
      };
    case WeatherActionTypes.LOAD_WEATHER_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
