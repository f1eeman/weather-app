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
      isLoggedIn: false,
    },
  },
  reducers: {
    addUser(state, { payload: { user } }) {
      const { users } = state;
      return { ...state, users: [...users, user] };
    },
    removeCurrentUser(state) {
      const currentUser = {
        email: null,
        login: null,
        favoriteCities: [],
        isLoggedIn: false,
      };
      return { ...state, currentUser };
    },
    setLogin(state, { payload: { login } }) {
      const { currentUser } = state;
      return { ...state, currentUser: { ...currentUser, login } };
    },
    setEmail(state, { payload: { email } }) {
      const { currentUser } = state;
      return { ...state, currentUser: { ...currentUser, email } };
    },
    changeLoggingStatus(state, { payload: { isLoggedIn } }) {
      const { currentUser } = state;
      return { ...state, currentUser: { ...currentUser, isLoggedIn } };
    },
    setFavoriteCities(state, { payload: { cities } }) {
      const { currentUser } = state;
      return { ...state, currentUser: { ...currentUser, favoriteCities: cities } };
    },
    addCity(state, { payload: { city } }) {
      const { currentUser } = state;
      const { favoriteCities } = currentUser;
      return {
        ...state, currentUser: { ...currentUser, favoriteCities: [...favoriteCities, city] },
      };
    },
    removeCity(state, { payload: { id } }) {
      const { currentUser } = state;
      const { favoriteCities } = currentUser;
      console.log('currentUser', currentUser);
      const filteredFavoriteCities = favoriteCities.filter((city) => {
        console.log('city', city);
        console.log('city.id !== id', city.id !== id);
        console.log('city.id', city.id);
        console.log('remove id', id);
        return city.id !== id;
      });
      return {
        ...state, currentUser: { ...currentUser, favoriteCities: filteredFavoriteCities },
      };
    },
  },
});

export const {
  addUser,
  removeCurrentUser,
  setLogin,
  setEmail,
  changeLoggingStatus,
  setFavoriteCities,
  addCity,
  removeCity,
} = usersInfoSlice.actions;

export default usersInfoSlice.reducer;
