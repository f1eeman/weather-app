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
        <div className="page-header__wrapper">
          <img
            className="page-header__logo"
            src={Logo}
            alt="Логотип сервиса прогноза погоды"
            width="129"
            height="55"
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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="user-menu__sign-out-icon" viewBox="0 0 16 16">
                <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
