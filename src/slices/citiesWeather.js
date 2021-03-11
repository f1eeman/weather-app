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
    temp: `${Math.round(temp)}\u2103`,
    feelsLike: `${Math.round(feelsLike)}\u2103`,
    pressure: `${pressure} гП`,
    humidity: `${humidity}\uFE6a`,
    cloudiness: `${cloudiness}\uFE6a`,
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
  reducers: {
    resetAllCitiesWeaherInfo() {
      return { weatherInfoList: [], gettingWeatherStatus: 'idle' };
    },
  },
  extraReducers: {
    [getCityWeatherInfo.pending]: (state) => (
      { ...state, gettingWeatherStatus: 'processing' }
    ),
    [getCityWeatherInfo.fulfilled]: (state, { payload: { weatherInfo } }) => {
      const { weatherInfoList } = state;
      return { weatherInfoList: [...weatherInfoList, weatherInfo], gettingWeatherStatus: 'finished' };
    },
    [getCityWeatherInfo.rejected]: (state) => (
      { ...state, gettingWeatherStatus: 'failed' }
    ),
  },
});

export { getCityWeatherInfo };

export const { resetAllCitiesWeaherInfo } = citiesWeatherSlice.actions;

export default citiesWeatherSlice.reducer;
