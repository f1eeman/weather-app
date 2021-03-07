import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import routes from '../../routes.js';
// import { actions as slicesActions } from '../../slices';
// import Spinner from './Spinner.js';
import Logo from '../img/logo.png';

const Header = () => {
  const myLogo = new Image();
  myLogo.src = Logo;
  const dispatch = useDispatch();
  const handleSignOut = () => {
    // dispatch(slicesActions.hideModal());
  };
  return (
    <header className="page-header">
      <div className="page-header__wrapper">
        <myLogo className="page-header__logo" />
        <p className="page-header__user-menu user-menu">
          <ul className="user-menu__list">
            <li className="user-menu__item">Name</li>
            <li className="user-menu__item">Email</li>
          </ul>
          <button
            className="user-menu__sign-out"
            type="button"
            handleClick={handleSignOut}
          >
            Выйти
          </button>
        </p>
      </div>
    </header>
  );
};

export default Header;
