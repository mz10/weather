import type { WeatherPoint } from '../types/base';
import '../styles/DayWeather.scss';
import { capitalizeFirst } from '../utils';

interface Props {
  weatherPoints: WeatherPoint[];
}

const getWeatherIcon = (weatherCode: number) => {
  switch (weatherCode) {
    case 500:
    case 501:
    case 520:
      return '🌧️';
    case 502:
    case 503:
    case 504:
    case 521:
      return '⛈️';
    case 600:
    case 601:
    case 602:
      return '❄️';
    case 800:
      return '☀️';
    case 801:
    case 802:
      return '⛅';
    case 803:
    case 804:
      return '☁️';
    default:
      return '🌈';
  }
};

const DayWeather: React.FC<Props> = ({ weatherPoints }) => {
  const dayData: Record<string, WeatherPoint[]> = {};
  
  weatherPoints.forEach(point => {
    const date = point.dt_txt.split(' ')[0];
    
    if (!dayData[date]) {
      dayData[date] = [];
    }

    dayData[date].push(point);
  });

  return (
    <div className="day-weather">
      {Object.entries(dayData).slice(0, 5).map(([date, items]) => {
        const minTemp = Math.min(...items.map(i => i.main.temp_min));
        const maxTemp = Math.max(...items.map(i => i.main.temp_max));
        const maxWind = Math.max(...items.map(i => i.wind.speed));
        const weather = items[0].weather[0];

        return (
          <div key={date} className="day-card">
            <div className="date">{new Date(date).toLocaleDateString([], { weekday: 'long' })}</div>
            <div className="weather-icon">{getWeatherIcon(weather.id)}</div>
            <div className="temps">
              <span className="max-temp">{Math.round(maxTemp)}°C</span>
              <span className="min-temp">{Math.round(minTemp)}°C</span>
            </div>
            <div className="description">{capitalizeFirst(weather.description)}</div>
            <div className="wind">🌬️ {Math.round(maxWind)} km/h</div>
          </div>
        );
      })}
    </div>
  );
};

export default DayWeather;
