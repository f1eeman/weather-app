import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import User from './User.js';
// import Context from './Context.js';
import reducer, { actions } from './slices/index.js';
import App from './components/App.js';
// import DataBaseApi from './DataBaseApi.js';
import './scss/style.scss';

const runApp = (storage) => {
  if (!storage.isInit()) {
    storage.initDataBase();
  }

  // console.log(storage.isInit());

  const store = configureStore({ reducer });

  const users = storage.getAllUsers();
  const currentUser = storage.getCurrentUser();

  users.forEach((user) => {
    console.log('users.forEach((user) => {}');
    store.dispatch(actions.addUser({ user }));
  });

  if (currentUser && currentUser.isLoggedIn) {
    console.log('actions.setLogin({ login })');
    const {
      login, email, favoriteCities: cities, isLoggedIn,
    } = currentUser;
    store.dispatch(actions.setLogin({ login }));
    store.dispatch(actions.setEmail({ email }));
    store.dispatch(actions.setFavoriteCities({ cities }));
    store.dispatch(actions.changeLoggingStatus({ isLoggedIn }));
  }

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

export default runApp;
