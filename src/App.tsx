import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCities } from './services/weatherService';
import type { RootState } from './store/store';
import type { City } from './types/base';
import './styles/App.scss'
import SearchBar from './components/SearchBar';

function App() {
  const dispatch = useDispatch();
  const { } = useSelector((state: RootState) => state);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    loadCities().then(setCities).catch(console.error);
  }, []);

  const onSelectCity = (city: City) => {
    
  };

  return (
    <>
      <SearchBar cities={cities} onSelectCity={onSelectCity} />
    </>
  )
}

export default App
