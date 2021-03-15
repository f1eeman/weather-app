import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthenticationPage from './Authentication.js';
import RegistrationPage from './Registration.js';
import Home from './Home.js';

const App = () => {
  const currentUser = useSelector((state) => state.usersInfo.currentUser);
  return (
    <BrowserRouter>
      {(currentUser && currentUser.isLoggedIn) ? <Redirect to="/" /> : <Redirect to="/reg" />}
      <Switch>
        <Route exact path="/reg" component={RegistrationPage} />
        <Route exact path="/auth" component={AuthenticationPage} />
        <Route exact path="/"><Home /></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
