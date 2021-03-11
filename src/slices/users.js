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
      query: null,
      isLoggedIn: false,
    },
  },
  reducers: {
    addUser(state, { payload: { user } }) {
      state.users.push(user);
    },
    removeCurrentUser(state) {
      const { currentUser } = state;
      currentUser.email = null;
      currentUser.login = null;
      currentUser.favoriteCities = [];
      currentUser.isLoggedIn = false;
    },
    addQuery(state, { payload: { query } }) {
      const { currentUser } = state;
      currentUser.query = query;
    },
    setLogin(state, { payload: { login } }) {
      const { currentUser } = state;
      currentUser.login = login;
    },
    setEmail(state, { payload: { email } }) {
      const { currentUser } = state;
      currentUser.email = email;
    },
    changeLoggingStatus(state, { payload: { isLoggedIn } }) {
      const { currentUser } = state;
      currentUser.isLoggedIn = isLoggedIn;
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
  removeCurrentUser,
  addQuery,
  setLogin,
  setEmail,
  changeLoggingStatus,
  setFavoriteCities,
  addCity,
  removeCity,
} = usersInfoSlice.actions;

export default usersInfoSlice.reducer;
