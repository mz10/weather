import type { City, WeatherRecord } from '../types/base';

export enum WeatherActionTypes {
  SELECT_CITY = 'SELECT_CITY',
  LOAD_WEATHER_REQUEST = 'LOAD_WEATHER_REQUEST',
  LOAD_WEATHER_SUCCESS = 'LOAD_WEATHER_SUCCESS',
  LOAD_WEATHER_FAILURE = 'LOAD_WEATHER_FAILURE',
}

export interface SelectCityAction {
  type: WeatherActionTypes.SELECT_CITY;
  payload: City;
}

export interface LoadWeatherRequestAction {
  type: WeatherActionTypes.LOAD_WEATHER_REQUEST;
  payload: number;
}

export interface LoadWeatherSuccessAction {
  type: WeatherActionTypes.LOAD_WEATHER_SUCCESS;
  payload: WeatherRecord;
}

export interface LoadWeatherFailureAction {
  type: WeatherActionTypes.LOAD_WEATHER_FAILURE;
  payload: string;
}

export type WeatherActions =
  | SelectCityAction
  | LoadWeatherRequestAction
  | LoadWeatherSuccessAction
  | LoadWeatherFailureAction;

export const selectCity = (city: City): SelectCityAction => ({
  type: WeatherActionTypes.SELECT_CITY,
  payload: city,
});

export const loadWeatherRequest = (cityId: number): LoadWeatherRequestAction => ({
  type: WeatherActionTypes.LOAD_WEATHER_REQUEST,
  payload: cityId,
});

export const loadWeatherSuccess = (data: WeatherRecord): LoadWeatherSuccessAction => ({
  type: WeatherActionTypes.LOAD_WEATHER_SUCCESS,
  payload: data,
});

export const loadWeatherFailure = (err: string): LoadWeatherFailureAction => ({
  type: WeatherActionTypes.LOAD_WEATHER_FAILURE,
  payload: err,
});
