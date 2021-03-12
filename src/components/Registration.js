import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uniqueId, omit } from 'lodash';
import storage from '../storage.js';
import Spinner from './Spinner.js';
import { actions as slicesActions } from '../slices/index.js';

const Registration = () => {
  console.log('Registration Comp');
  const { usersLogins, usersEmails } = useSelector((state) => (
    {
      usersLogins: state.usersInfo.users.map(({ login }) => login),
      usersEmails: state.usersInfo.users.map(({ email }) => email),
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
      password: '',
      confirmPassword: '',
      email: '',
    },
    validationSchema: Yup.object().shape({
      login: Yup
        .string()
        .min(4, 'Количество символов должно быть от 4 до 30')
        .max(30, 'Количество символов должно быть от 4 до 30')
        .required('Поле является обязательным к заполнению')
        .notOneOf(usersLogins, 'Логин уже занят'),
      email: Yup
        .string()
        .email('Введите валидный email')
        .required('Поле является обязательным к заполнению')
        .notOneOf(usersEmails, 'Указанная электронная почта зарегистрирована'),
      password: Yup
        .string()
        .min(8, 'Количество символов должно быть не меньше 8')
        .required('Поле является обязательным к заполнению'),
      confirmPassword: Yup
        .string()
        .min(8, 'Количество символов должно быть не меньше 8')
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Поле является обязательным к заполнению'),
    }),
    onSubmit: async (values, actions) => {
      const { login, password, email } = values;
      const id = uniqueId();
      const userInfo = {
        id, login, password, email, favoriteCities: [], isLoggedIn: false,
      };
      // console.log('userInfo', userInfo);
      try {
        await storage.addUser(userInfo);
        dispatch(slicesActions.addUser({ user: omit(userInfo, 'password') }));
        history.push('/auth');
      } catch (e) {
        // куда вписывать ошибки
        actions.setErrors({ login: 'Упс, что-то пошло не так! Попробуйте снова.' });
        throw e;
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
    const trimmedValue = (e.target.value || '').replace(/\s+/g, '');
    formik.setFieldValue(e.target.name, trimmedValue);
  };

  const renderButton = () => (
    <button type="submit" disabled={formik.isSubmitting} className="reg-form__button-submit button">
      {formik.isSubmitting ? <Spinner /> : 'Отправить'}
    </button>
  );

  const renderFeedBack = (fieldName) => (
    <>
      {formik.errors[fieldName] && formik.touched[fieldName] && (
        <p className="reg-form__invalid-feedback">{formik.errors[fieldName]}</p>
      )}
    </>
  );

  return (
    <main className="page-main">
      <h1 className="visually-hidden">Страница регистрации пользователя</h1>
      <section className="page-main__registration registration">
        <div className="registration__container">
          <h2 className="registration__title">Форма регистрации</h2>
          <form className="registration__reg-form reg-form" onSubmit={formik.handleSubmit}>
            <ul className="reg-form__list" role="presentation">
              <li className="reg-form__item">
                <label className="reg-form__label" htmlFor="login">Придумайте логин</label>
                <input
                  ref={loginFieldRef}
                  value={formik.values.login}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  className="reg-form__control"
                  id="login"
                  name="login"
                  type="text"
                  placeholder="superman"
                />
                {renderFeedBack('login')}
              </li>
              <li className="reg-form__item">
                <label className="reg-form__label" htmlFor="email">Укажите свою электронную почту</label>
                <input
                  value={formik.values.email}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  className="reg-form__control"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="batman_must_die@smile.com"
                />
                {renderFeedBack('email')}
              </li>
              <li className="reg-form__item">
                <label className="reg-form__label" htmlFor="password">Придумайте пароль</label>
                <input
                  value={formik.values.password}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  className="reg-form__control"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                />
                {renderFeedBack('password')}
              </li>
              <li className="reg-form__item">
                <label className="reg-form__label" htmlFor="confirmPassword">Повторите пароль</label>
                <input
                  value={formik.values.confirmPassword}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  className="reg-form__control"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                />
                {renderFeedBack('confirmPassword')}
              </li>
            </ul>
            <div className="reg-form__wrapper">
              {renderButton()}
              <p className="reg-form__info">*Все поля обязательны для заполнения</p>
            </div>
          </form>
          <div className="registration__entry entry">
            <p className="entry__text">*Если вы уже зарегистрированы, войдите в систему</p>
            <NavLink
              className="entry__link button"
              to="/auth"
            >
              Войти
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Registration;
