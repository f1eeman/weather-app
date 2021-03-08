/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const usersInfoSlice = createSlice({
  name: 'usersInfo',
  initialState: {
    users: [],
    currentUser: {
      login: null,
      email: null,
      favoriteCities: [],
    },
  },
  reducers: {
    addUser(state, { payload: { user } }) {
      console.log('SLICE', user);
      state.users.push(user);
    },
    setLogin(state, { payload: { login } }) {
      const { currentUser } = state;
      currentUser.login = login;
    },
    setEmail(state, { payload: { email } }) {
      const { currentUser } = state;
      currentUser.email = email;
    },
    addCity(state, { payload: { city } }) {
      const { currentUser } = state;
      currentUser.favoriteCities.push(city);
    },
    setFavoriteCities(state, { payload: { cities } }) {
      const { currentUser } = state;
      currentUser.favoriteCities = cities;
    },
    removeCity(state, { payload: { id } }) {
      const { currentUser } = state;
      currentUser.favoriteCities = currentUser.favoriteCities.filter((city) => city.id !== id);
    },
  },
});

export const {
  addUser,
  setLogin,
  setEmail,
  setFavoriteCities,
  addCity,
  removeCity,
} = usersInfoSlice.actions;

export default usersInfoSlice.reducer;
