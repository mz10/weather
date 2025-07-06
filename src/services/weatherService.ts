import type { City, WeatherPoint, WeatherRecord } from '../types/base';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = "5fbb150915e06d9b0a7ab49ad0510846"; //import.meta.env.VITE_OPENWEATHER_API_KEY as string;

export async function loadCities(): Promise<City[]> {
  const res = await fetch('/city.list.json');

  if (!res.ok) throw new Error('Seznam měst nelze načíst!');
  
  return res.json();
}

export async function loadWeatherApi(cityId: number): Promise<WeatherRecord> {
  const url = `${BASE_URL}/forecast?id=${cityId}&units=metric&appid=${API_KEY}&lang=cz`;
  const res = await fetch(url);
  
  if (!res.ok) throw new Error('Chyba při načítání předpovědi');
  
  const data = await res.json();
  console.log(data);
  const list: WeatherPoint[] = data.list;
  
  const days: Record<string, { min: number; max: number }> = {};
  
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    
    if (!days[date]) days[date] = { min: item.main.temp_min, max: item.main.temp_max };
    else {
      days[date].min = Math.min(days[date].min, item.main.temp_min);
      days[date].max = Math.max(days[date].max, item.main.temp_max);
    }
  });

  return {
    daily: Object.entries(days).slice(0, 5).map(([date, temps]) => ({ date, ...temps })),
    hourly: list
  };
}