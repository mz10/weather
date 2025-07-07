A simple single-page application for displaying five-day weather forecasts using the OpenWeatherMap API. The user can select a city from the whisperer, view with daily values and a detailed graph of temperatures at 3 hour intervals.

# Instalation
### Install PNPM
PNPM is a fast package manager that saves disk space by sharing packages between projects.
- using npm (install npm from https://nodejs.org):
`npm install -g pnpm`
- or using Yarn:
`yarn global add pnpm`

Verify installation by running:
`pnpm --version`

### Clone the repository
`git clone https://github.com/mz10/weather.git`
`cd weather`

Install dependencies
`pnpm install`

Set up API key in /src/services/weatherService.ts (API_KEY)

### Running and Build
- Development mode with hot reload:
`pnpm dev`

- Production build:
`pnpm build`

# Main files
- DayWeather.tsx - displays the five-day overview (daily data)
- SearchBar.tsx - text input with autocomplete (cities)
- TempChart.tsx - detailed graph of temperatures at 3 hour intervals (chart.js)
- weatherService.ts - handles OpenWeatherMap API calls and data parsing store
- sagas.ts - Redux-Saga for async HTTP requests
- city.list.json - list of cities for the autocomplete

# State Management and Styling
- Uses Redux for state management and Redux-Saga to handle HTTP requests.
- Styles are written in SASS and compiled by Vite.

# Usage
- Open browser and navigate to http://localhost:5173
- Type a city name into the search field (or geolocation)
- Select a city from the suggestions.

# Supported Browsers
App has been tested on the following browsers:
- Mozilla Firefox 140 (support geolocation on localhost)
- Google Chrome 138 (geolocation only on HTTPS)