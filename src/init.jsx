import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App.js';
import AuthenticationPage from './components/Authentication.js';
import RegistrationPage from './components/Registration.js';
import Home from './components/Home.js';
import storage from './storage.js';
// import User from './User.js';
// import Context from './Context.js';
import reducer from './slices/index.js';
// import DataBaseApi from './DataBaseApi.js';
import './scss/style.scss';

const runApp = () => {
  if (!storage.isInit()) {
    storage.initDataBase();
  }

  const store = configureStore({ reducer });

  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Switch>
          <Route exact path="/reg" component={RegistrationPage} />
          <Route exact path="/auth" component={AuthenticationPage} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

export default runApp;
