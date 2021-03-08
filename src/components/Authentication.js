import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import storage from '../storage.js';
import Spinner from './Spinner.js';
import { actions as slicesActions } from '../slices/index.js';

const Authentication = () => {
  const { usersLogins } = useSelector((state) => (
    {
      usersLogins: state.usersInfo.users.map(({ login }) => login),
    }
  ));
  const history = useHistory();
  const dispatch = useDispatch();
  const loginFieldRef = useRef(null);
  useEffect(() => {
    loginFieldRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      login: Yup
        .string()
        .min(4, 'Количество символов должно быть от 3 до 8')
        .max(8, 'Количество символов должно быть от 3 до 8')
        .required('Поле является обязательным к заполнению')
        .trim('Не должно быть пробелов в начале и конце строки')
        .oneOf(usersLogins, 'Данный логин не зарегистрован в системе')
        .strict(true),
      password: Yup
        .string()
        .min(8, 'Количество символов должно быть не меньше 8')
        .required(' Поле является обязательным к заполнению')
        .trim('Не должно быть пробелов в начале и конце строки')
        .strict(true),
      confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Поле является обязательным к заполнению')
        .strict(true),
    }),
    onSubmit: (values, actions) => {
      const { login, password } = values;
      try {
        const allUsersList = storage.getAllUsers();
        const currentUser = allUsersList.find((user) => user.login === login);
        if (currentUser.password !== password) {
          actions.setErrors({ password: 'Неверно указан пароль' });
          return;
        }
        console.log('AUTH SUBMIT', currentUser);
        storage.setCurrentUser(currentUser);
        dispatch(slicesActions.setLogin({ login: currentUser.login }));
        dispatch(slicesActions.setEmail({ email: currentUser.email }));
        dispatch(slicesActions.setFavoriteCities({ cities: currentUser.favoriteCities }));
        history.push('/');
      } catch (e) {
        // куда вписывать ошибки
        actions.setErrors({ login: 'Упс, что-то пошло не так! Попробуйте снова.' });
        throw e;
      }
    },
  });

  const renderButton = () => (
    <button type="submit" disabled={formik.isSubmitting}>
      {formik.isSubmitting ? <Spinner /> : 'Отправить'}
    </button>
  );

  const renderFeedBack = (fieldName) => (
    <>
      {formik.errors[fieldName] && formik.touched[fieldName] && (
        <div className="invalid-feedback">{formik.errors[fieldName]}</div>
      )}
    </>
  );

  // const renderFeedBack = (fieldName) => {
  //   console.log('AUTH', formik.errors);
  //   return (
  //     <>
  //       {formik.errors[fieldName] && formik.touched[fieldName] && (
  //         <div className="invalid-feedback">{formik.errors[fieldName]}</div>
  //       )}
  //     </>
  //   );
  // };

  return (
    <>
      <form className="reg-form" onSubmit={formik.handleSubmit}>
        <ul className="reg-form__list" role="presentation">
          <li className="reg-form__item">
            <label className="reg-form__label" htmlFor="login">Укажите логин</label>
            <input
              ref={loginFieldRef}
              value={formik.values.login}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              className="reg-form__control"
              id="login"
              name="login"
              type="text"
              placeholder="Логин"
            />
            {renderFeedBack('login')}
          </li>
          <li className="reg-form__item">
            <label className="reg-form__label" htmlFor="password">Укажите пароль</label>
            <input
              ref={loginFieldRef}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              className="reg-form__control"
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
            />
            {renderFeedBack('password')}
          </li>
          <li className="reg-form__item">
            <label className="reg-form__label" htmlFor="confirmPassword">Повторите пароль</label>
            <input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              className="reg-form__control"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Пароль"
            />
            {renderFeedBack('confirmPassword')}
          </li>
        </ul>
        {renderButton()}
      </form>
      <div className="">
        <p className="">Еще нет аккаунта? Перейдите по ссылке для регистрации</p>
        <NavLink
          isActive={() => !formik.isSubmitting}
          to="/reg"
        >
          Зарегистрироваться
        </NavLink>
      </div>
    </>
  );
};

export default Authentication;
