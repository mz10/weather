import './styles/App.scss'
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findNearestCity, loadCities } from './services/weatherService';
import type { RootState } from './store/store';
import type { City } from './types/base';
import SearchBar from './components/SearchBar';
import DayWeather from './components/DayWeather';
import { 
  selectCity, 
  loadWeatherRequest, 
  loadWeatherFailure,
  loadCitiesRequest,
  loadCitiesSuccess,
  loadCitiesFailure
} from './store/actions';
import { If } from './components/If';
import TempChart from './components/TempChart';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';
import { extractErrorMessage } from './utils';

function App() {
  const dispatch = useDispatch();
  const { weatherPoints, loading, citiesLoading, error, selectedCity } = useSelector((state: RootState) => state);
  const [cities, setCities] = useState<City[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const onSelectCity = async (city: City) => {
    //abort running geolocation
    abortControllerRef.current?.abort();
    dispatch(selectCity(city));
    dispatch(loadWeatherRequest(city.id));
  };
  
  const initData = async () => {
    try {
      dispatch(loadCitiesRequest());
      const cities = await loadCities();
      setCities(cities);
      dispatch(loadCitiesSuccess(cities));

      abortControllerRef.current = new AbortController();
      const city = await findNearestCity(cities, abortControllerRef.current.signal);

      if (city) {
        onSelectCity(city);
      }
    }
    catch(error: unknown) {
      const message = extractErrorMessage(error, "Data se nepodařilo načíst!");
      
      if (message.includes("Seznam měst")) {
        dispatch(loadCitiesFailure(message));
      } 
      else {
        dispatch(loadWeatherFailure(message));
      }
    }
  }

  useEffect(() => {
    initData();
    
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return (
    <>
      <If is={!citiesLoading}>
        <SearchBar cities={cities} onSelectCity={onSelectCity} />
      </If>
      <div className="loading-container">
        <If is={loading || citiesLoading}>
          <LoadingIndicator />
        </If>
      </div>
      <If is={error}>
        <ErrorMessage message={error} />
      </If>
      <If is={selectedCity && !loading && !error}>
        <h2>Předpověď počasí pro: {selectedCity?.name}</h2>
        <DayWeather weatherPoints={weatherPoints} />
        <TempChart weatherPoints={weatherPoints} />
      </If>
    </>
  )
}

export default App
