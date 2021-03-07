/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    login: null,
    email: null,
    favoriteCities: [],
  },
  reducers: {
    setLogin(state, { payload: { login } }) {
      state.login = login;
    },
    setEmail(state, { payload: { email } }) {
      state.email = email;
    },
    addCity(state, { payload: { city } }) {
      state.favoriteCities.push(city);
    },
    removeCity(state, { payload: { id } }) {
      state.favoriteCities = state.favoriteCities.filter((city) => city.id !== id);
    },
  },
});

export const {
  setLogin, setEmail, addCity, removeCity,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
