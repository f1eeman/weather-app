import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App.js';
import storage from './storage.js';
// import User from './User.js';
// import Context from './Context.js';
import reducer from './slices';
// import DataBaseApi from './DataBaseApi.js';
import './scss/style.scss';

const runApp = () => {
  storage.initDataBase();
  const store = configureStore({ reducer });

  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

export default runApp;
