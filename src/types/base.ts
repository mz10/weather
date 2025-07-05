export interface WeatherState {
    selectedCity: City | null;
    loading: boolean;
    error: string | null;
    weather: Weather[];
}

export interface City {
    id: number;
    name: string;
    country: string;
}

export interface Weather {
    date: string;
    min: number;
    max: number;
}