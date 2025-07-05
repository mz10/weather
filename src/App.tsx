import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForecastApi, loadCities } from './services/weatherService';
import type { RootState } from './store/store';
import type { City } from './types/base';
import './styles/App.scss'
import SearchBar from './components/SearchBar';
import DayWeather from './components/DayWeather';
import { selectCity, loadWeatherRequest, loadWeatherSuccess, loadWeatherFailure } from './store/actions';
import { If } from './components/If';
import TempChart from './components/TempChart';

function App() {
  const dispatch = useDispatch();
  const { weatherPoints, loading, error, selectedCity } = useSelector((state: RootState) => state);
  const { } = useSelector((state: RootState) => state);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    loadCities().then(setCities).catch(console.error);
  }, []);

  const onSelectCity = async (city: City) => {
    console.log("city", city);
    dispatch(selectCity(city));
    //dispatch(loadWeatherRequest(city.id));

    try {
      const data = await fetchForecastApi(city.id);
      dispatch(loadWeatherSuccess(data));
    } 
    catch (e: any) {
      dispatch(loadWeatherFailure(e.message));
    }
  };

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
