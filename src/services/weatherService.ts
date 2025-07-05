import type { City } from '../types/base';

export async function loadCities(): Promise<City[]> {
  const res = await fetch('/city.list.json');

  if (!res.ok) throw new Error('Seznam měst nelze načíst!');
  
  return res.json();
}