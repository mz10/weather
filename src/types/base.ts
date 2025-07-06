export interface WeatherState {
    selectedCity: City | null;
    loading: boolean;
    error: string | null;
    weather: WeatherDay[];
    weatherPoints: WeatherPoint[];
}

export interface City {
    id: number;
    name: string;
    country: string;
    coord: {
      lat: number;
      lon: number;
    };
}

export interface WeatherDay {
    date: string;
    min: number;
    max: number;
}

export interface WeatherPoint {
    dt_txt: string;
    dt: number;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    clouds?: {
        all: number;
    };
    pop?: number;
    visibility?: number;
}

export interface WeatherRecord {
    daily: WeatherDay[];
    hourly: WeatherPoint[];
}