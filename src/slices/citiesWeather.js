/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getRoute from '../route.js';

const getCityWeatherInfo = createAsyncThunk(
  'gettingWeather',
  async ({ cityName, removable }, { rejectWithValue }) => {
    const route = getRoute(cityName);
    try {
      const res = await axios.get(route);
      const {
        name,
        id,
        coord: { lat, lon },
        main: {
          temp, feels_like: feelsLike, pressure, humidity,
        },
        clouds: { all: cloudiness },
        weather: [{ description: condition }],
      } = res.data;

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
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const citiesWeatherSlice = createSlice({
  name: 'citiesWeatherInfo',
  initialState: {
    weatherInfoList: [],
    error: null,
    gettingStatus: 'idle',
  },
  reducers: {
    resetAllCitiesWeaherInfo() {
      return {
        weatherInfoList: [],
        error: null,
        gettingStatus: 'idle',
      };
    },
    removeCityWeather(state, { payload: { id } }) {
      const { weatherInfoList } = state;
      const filteredWeatherInfoList = weatherInfoList.filter(
        (cityWeather) => cityWeather.id !== id,
      );
      return {
        ...state, weatherInfoList: filteredWeatherInfoList,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCityWeatherInfo.pending, (state) => {
      state.gettingStatus = 'processing';
    });
    builder.addCase(getCityWeatherInfo.fulfilled, (state, { payload: { weatherInfo } }) => {
      state.weatherInfoList.push(weatherInfo);
      state.gettingStatus = 'finished';
    });
    builder.addCase(getCityWeatherInfo.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
      state.gettingStatus = 'failed';
    });
  },
});

export { getCityWeatherInfo };

export const { resetAllCitiesWeaherInfo, removeCityWeather } = citiesWeatherSlice.actions;

export default citiesWeatherSlice.reducer;
