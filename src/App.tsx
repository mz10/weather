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

function App() {
  const dispatch = useDispatch();
  const { weatherPoints, loading, error, selectedCity } = useSelector((state: RootState) => state);
  const { } = useSelector((state: RootState) => state);
  const [cities, setCities] = useState<City[]>([]);

  const onSelectCity = async (city: City) => {
    console.log("city", city);
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
      <If is={!!selectedCity}>
        Předpověď počasí pro: {selectedCity?.name}
        <DayWeather weatherPoints={weatherPoints} />
        <TempChart weatherPoints={weatherPoints} />
      </If>
    </>
  )
}

export default App
