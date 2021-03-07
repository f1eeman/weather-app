import React, { useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uniqueId } from 'lodash';
// import routes from '../../routes.js';
// import { actions as slicesActions } from '../../slices';
import storage from '../storage.js';
import Spinner from './Spinner.js';

const Registration = () => {
  const history = useHistory();
  const loginFieldRef = useRef(null);
  useEffect(() => {
    loginFieldRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      login: Yup
        .string()
        .min(4, 'Количество символов должно быть от 3 до 8')
        .max(8, 'Количество символов должно быть от 3 до 8')
        .required('Поле является обязательным к заполнению')
        .trim('Не должно быть пробелов в начале и конце строки')
        .strict(true),
      // .notOneOf(loginsList, 'Логин уже занят'),
      email: Yup
        .string()
        .email('Введите валидный email')
        .required('Поле является обязательным к заполнению')
        .trim('Не должно быть пробелов в начале и конце строки'),
      password: Yup
        .string()
        .min(8, 'Количество символов должно быть не меньше 8')
        .required('Поле является обязательным к заполнению')
        .trim('Не должно быть пробелов в начале и конце строки'),
    }),
    onSubmit: (values, actions) => {
      const userLogin = { name: values.login };
      const userPassword = { name: values.password };
      const userEmail = { name: values.email };
      const userId = uniqueId();
      const allUsers = storage.getAllUsers();
      const isLoginRegistered = allUsers.some(({ login }) => login === userLogin);
      const isEmailRegistered = allUsers.some(({ email }) => email === userEmail);
      if (isLoginRegistered) {
        // Куда записывать ошибки?
        actions.setErrors({ login: 'Логин занят' });
        return;
      }
      if (isEmailRegistered) {
        // Куда записывать ошибки?
        actions.setErrors({ login: 'Данная почта уже используется' });
        return;
      }
      try {
        storage.addUser({
          id: userId,
          login: userLogin,
          email: userEmail,
          password: userPassword,
        });
        history.push('/auth');
      } catch (e) {
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
      {formik.errors[fieldName] && (
        <div className="invalid-feedback">{formik.errors.body}</div>
      )}
    </>
  );

  return (
    <>
      <form className="reg-form" onSubmit={formik.handleSubmit}>
        <ul className="reg-form__list" role="presentation">
          <li className="reg-form__item">
            <label className="reg-form__label" htmlFor="login">Придумайте логин</label>
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
            <label className="reg-form__label" htmlFor="email">Укажите свою электронную почту</label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              className="reg-form__control"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
            />
            {renderFeedBack('email')}
          </li>
          <li className="reg-form__item">
            <label className="reg-form__label" htmlFor="password">Придумайте пароль</label>
            <input
              ref={loginFieldRef}
              value={formik.values.login}
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
        </ul>
        {renderButton()}
      </form>
      <div className="">
        <p className="">Если вы уже зарегистрированы, войдите в систему</p>
        <NavLink
          isActive={!formik.isSubmitting}
          to="/auth"
        >
          Войти
        </NavLink>
      </div>
    </>
  );
};

export default Registration;
