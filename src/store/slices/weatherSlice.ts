import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface WeatherData {
  date: string;
  temperature: number;
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
}

interface DailyForecasts {
  [key: string]: ForecastItem[];
}

export const fetchWeatherByCity = createAsyncThunk(
    'weather/fetchWeatherByCity',
    async (city: string) => {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY
        const geoResponse = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
        );
        const geoData = geoResponse.data;

        if (!geoData || geoData.length === 0) {
            throw new Error('City not found');
        }

        const { lat, lon } = geoData[0];

        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        const forecastData = forecastResponse.data;

        if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
            return [];
        }

        const processedForecast: WeatherData[] = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const dailyForecasts: DailyForecasts = {};

        forecastData.list.forEach((item: ForecastItem) => {
            const date = new Date(item.dt * 1000);
            const day = date.toISOString().split('T')[0]; // YYYY-MM-DD

            if (!dailyForecasts[day]) {
                dailyForecasts[day] = [];
            }

            dailyForecasts[day].push(item);
        });

        Object.keys(dailyForecasts).slice(0, 5).forEach(day => {
            const forecasts = dailyForecasts[day];
            const middleIndex = Math.floor(forecasts.length / 2);
            const forecast = forecasts[middleIndex];
            const date = new Date(forecast.dt * 1000);

            processedForecast.push({
                date: days[date.getDay()],
                temperature: Math.round(forecast.main.temp)
            });
        });

        return processedForecast;
    }
);

interface WeatherState {
    data: WeatherData[] | null;
    error: boolean;
}

const initialState: WeatherState = {
    data: null,
    error: false,
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherByCity.fulfilled, (state, action: PayloadAction<WeatherData[]>) => {
                state.data = action.payload
                state.error = false;
            })
            .addCase(fetchWeatherByCity.rejected, (state) => {
                state.data = null;
                state.error = true;
            })
    }
})

export default weatherSlice.reducer
