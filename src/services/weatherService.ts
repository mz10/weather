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

// calculate distance
export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (deg: number) => deg * Math.PI / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getUserLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolokace není podporována v tomto prohlížeči.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => resolve({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }),
      err => reject(`Chyba geolokace: ${err.message}`)
    );
  });
}

export async function findNearestCity(cities: City[]): Promise<City | null> {
  try {
    const userPos = await getUserLocation();
    console.log("mesta", cities, userPos);

    let nearest: City | null = null;
    let minDist = Infinity;

    for (const city of cities) {
      const dist = getDistance(userPos.lat, userPos.lon, city.coord.lat, city.coord.lon);
      if (dist < minDist) {
        minDist = dist;
        nearest = city;
      }
    }

    return nearest;
  } 
  catch (err) {
    console.error(err);
    return null;
  }
}
