/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getRoute from '../route.js';

const getCityWeatherInfo = createAsyncThunk('gettingWeather', async ({ city, removable }) => {
  const route = getRoute(city);
  const { data } = await axios.get(route);
  const {
    name,
    id,
    coord: { lat, lon },
    main: {
      temp, feels_like: feelsLike, pressure, humidity,
    },
    clouds: { all: cloudiness },
    weather: [{ description: condition }],
  } = data;

  const weatherInfo = {
    removable,
    name,
    id,
    lat,
    lon,
    temp,
    feelsLike,
    pressure,
    humidity,
    cloudiness,
    condition,
  };

  return { weatherInfo };
});

const citiesWeatherSlice = createSlice({
  name: 'citiesWeatherInfo',
  initialState: {
    weatherInfoList: [],
    gettingWeatherStatus: 'idle',
  },
  extraReducers: {
    [getCityWeatherInfo.pending]: (state) => {
      state.gettingWeatherStatus = 'processing';
    },
    [getCityWeatherInfo.fulfilled]: (state, { payload: { weatherInfo } }) => {
      state.weatherInfoList.push(weatherInfo);
      state.gettingWeatherStatus = 'finished';
    },
    [getCityWeatherInfo.rejected]: (state) => {
      state.gettingWeatherStatus = 'failed';
    },
  },
});

export { getCityWeatherInfo };

export default citiesWeatherSlice.reducer;
