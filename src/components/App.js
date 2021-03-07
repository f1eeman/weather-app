import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { uniqueId } from 'lodash';
import Home from './Home.js';
import AuthenticationPage from './Authentication.js';
import RegistrationPage from './Registration.js';
// import User from './User.js';
import storage from '../storage.js';
import '../scss/style.scss';

const App = () => {
  const currentUser = storage.getCurrentUser();
  if (!currentUser) {
    return <Redirect to="/reg" />;
  }
  return (
    <>
      <Home />
      <Switch>
        <Route exact path="/reg" component={RegistrationPage} />
        <Route exact path="/auth" component={AuthenticationPage} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
