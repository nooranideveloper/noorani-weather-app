import axios from "axios";

const weatherUrl = 'https://api.openweathermap.org/data/2.5';
const currentWeatherUrl = `${weatherUrl}/weather`;
const forecastWeatherUrl = `${weatherUrl}/forecast`;

export const weatherIconUrl = 'https://openweathermap.org/img/wn/';

const apiKey = import.meta.env.VITE_WEATHER_API_KAY;


export const fetchWeatherByCoord = async (geoData) => {
    if(!geoData?.latitude || !geoData?.longitude) return;


    const params = {
        lat: geoData.latitude,
        lon: geoData.longitude,
        units: 'metric',
        appid: apiKey
    }

    const [current, forecast] = await Promise.all([axios.get(currentWeatherUrl, {params}), axios.get(forecastWeatherUrl, {params})])
    console.log(current, forecast);
    return {currentWeather: current.data, foracastData: forecast.data};
}

export const fetchWeatherByCity = async (searchQuery) => {
    if(!searchQuery) return;


    const params = {
        q: searchQuery,
        units: 'metric',
        appid: apiKey,
    }

    const [current, forecast] = await Promise.all([axios.get(currentWeatherUrl, {params}), axios.get(forecastWeatherUrl, {params})])
    console.log(current, forecast);
    return {currentWeather: current.data, foracastData: forecast.data};
}