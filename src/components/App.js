import React from 'react';
import { Redirect } from 'react-router-dom';
import storage from '../storage.js';
// import '../scss/style.scss';

const App = () => {
  const currentUser = storage.getCurrentUser();
  if (!currentUser) {
    return <Redirect to="/reg" />;
  }
  return <Redirect to="/" />;
};

export default App;
