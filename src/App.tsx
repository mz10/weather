import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findNearestCity, loadCities } from './services/weatherService';
import type { RootState } from './store/store';
import type { City } from './types/base';
import './styles/App.scss'
import SearchBar from './components/SearchBar';
import DayWeather from './components/DayWeather';
import { selectCity, loadWeatherRequest } from './store/actions';
import { If } from './components/If';
import TempChart from './components/TempChart';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const dispatch = useDispatch();
  const { weatherPoints, loading, error, selectedCity } = useSelector((state: RootState) => state);
  const { } = useSelector((state: RootState) => state);
  const [cities, setCities] = useState<City[]>([]);

  const onSelectCity = async (city: City) => {
    dispatch(selectCity(city));
    dispatch(loadWeatherRequest(city.id));
  };
  
  async function initData() {
    try {
      const cities = await loadCities();
      setCities(cities);

      const city = await findNearestCity(cities);

      if (city) {
        onSelectCity(city);
      }
    }
    catch(error) {
      console.error(error)
    }
  }

  useEffect(() => { initData() }, []);

  return (
    <>
      <SearchBar cities={cities} onSelectCity={onSelectCity} />
      <If is={loading}>
        <LoadingIndicator />
      </If>
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
