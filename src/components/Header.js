import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import routes from '../../routes.js';
// import { actions as slicesActions } from '../../slices';
// import Spinner from './Spinner.js';
import { actions as slicesActions } from '../slices/index.js';
import storage from '../storage.js';
import Logo from '../assets/img/logo.png';

const Header = () => {
  // console.log('Header Comp');
  const currentUser = useSelector((state) => state.usersInfo.currentUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    storage.removeCurrentUser();
    dispatch(slicesActions.removeCurrentUser());
    dispatch(slicesActions.resetAllCitiesWeaherInfo());
    history.push('/reg');
  };
  return (
    <header className="page-header">
      <div className="container">
        <img
          className="page-header__logo"
          src={Logo}
          alt="Логотип сервиса прогноза погоды"
        />
        <div className="page-header__user-menu user-menu">
          <ul className="user-menu__list">
            <li className="user-menu__item">{currentUser.login}</li>
            <li className="user-menu__item">{currentUser.email}</li>
          </ul>
          <button
            className="user-menu__sign-out"
            type="button"
            onClick={handleSignOut}
          >
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
