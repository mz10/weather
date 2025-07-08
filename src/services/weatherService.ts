import type { City, WeatherPoint, WeatherRecord } from '../types/base';
import { extractErrorMessage } from '../utils';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = "5fbb150915e06d9b0a7ab49ad0510846";

export async function loadCities(): Promise<City[]> {
  const res = await fetch('./city.list.json');

  if (!res.ok) throw new Error('Seznam měst nelze načíst!');
  
  return res.json();
}

export async function loadWeatherApi(cityId: number): Promise<WeatherRecord> {
  const url = `${BASE_URL}/forecast?id=${cityId}&units=metric&appid=${API_KEY}&lang=cz`;
  const res = await fetch(url);
  
  if (!res.ok) throw new Error('Chyba při načítání předpovědi!');
  
  const data = await res.json();
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

export function getUserLocation(options?: { signal?: AbortSignal, timeout?: number }): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolokace není podporována v tomto prohlížeči.');
      return;
    }

    const timeoutId = setTimeout(() => {
      reject('Vypršel časový limit pro geolokaci (15s)');
    }, options?.timeout || 15000);

    const success = (pos: GeolocationPosition) => {
      clearTimeout(timeoutId);
      resolve({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      });
    };

    const error = (err: GeolocationPositionError) => {
      clearTimeout(timeoutId);
      reject(`Chyba geolokace: ${err.message}`);
    };

    const watchId = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      maximumAge: 0
    });

    options?.signal?.addEventListener('abort', () => {
      clearTimeout(timeoutId);
      navigator.geolocation.clearWatch(watchId);
      reject('Geolokace byla zrušena');
    });
  });
}

export async function findNearestCity(cities: City[], geolocSignal?: AbortSignal): Promise<City | null> {
  try {
    const userPos = await getUserLocation({ signal: geolocSignal, timeout: 15000 });
    
    return cities.reduce((nearest: City | null, city) => {
      if (geolocSignal?.aborted) throw new Error('Geolokace byla zrušena');
      
      const dist = getDistance(
        userPos.lat, 
        userPos.lon, 
        city.coord.lat, 
        city.coord.lon
      );
      
      if (!nearest) return city;
      const nearestDist = getDistance(
        userPos.lat,
        userPos.lon,
        nearest.coord.lat,
        nearest.coord.lon
      );

      return dist < nearestDist ? city : nearest;
    }, null);
  } 
  catch (err: unknown) {
    if (geolocSignal?.aborted) return null;
    
    const message = extractErrorMessage(err, 'Geolokace se nezdařila!');
    throw new Error(message);
  }
}
