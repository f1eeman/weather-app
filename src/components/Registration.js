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
        .min(4, 'Количество символов должно быть от 3 до 8')
        .max(8, 'Количество символов должно быть от 3 до 8')
        .required('Поле является обязательным к заполнению')
        .trim('Не должно быть пробелов в начале и конце строки')
        .notOneOf(usersLogins, 'Логин уже занят')
        .strict(true),
      email: Yup
        .string()
        .email('Введите валидный email')
        .required('Поле является обязательным к заполнению')
        .trim('Не должно быть пробелов в начале и конце строки')
        .notOneOf(usersEmails, 'Указанная электронная почта зарегистрирована')
        .strict(true),
      password: Yup
        .string()
        .min(8, 'Количество символов должно быть не меньше 8')
        .required('Поле является обязательным к заполнению')
        .trim('Не должно быть пробелов в начале и конце строки')
        .strict(true),
      confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Поле является обязательным к заполнению')
        .strict(true),
    }),
    onSubmit: async (values, actions) => {
      const { login, password, email } = values;
      const id = uniqueId();
      const userInfo = {
        id, login, password, email, favoriteCities: [],
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

  const renderButton = () => (
    <button type="submit" disabled={formik.isSubmitting}>
      {formik.isSubmitting ? <Spinner /> : 'Отправить'}
    </button>
  );

  // const renderFeedBack = (fieldName) => {
  //   console.log('REG', formik.errors);
  //   return (
  //     <>
  //       {formik.errors[fieldName] && formik.touched[fieldName] && (
  //         <div className="invalid-feedback">{formik.errors[fieldName]}</div>
  //       )}
  //     </>
  //   );
  // };

  const renderFeedBack = (fieldName) => (
    <>
      {formik.errors[fieldName] && formik.touched[fieldName] && (
        <div className="invalid-feedback">{formik.errors[fieldName]}</div>
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
        <p className="">Если вы уже зарегистрированы, войдите в систему</p>
        <NavLink
          isActive={() => !formik.isSubmitting}
          to="/auth"
        >
          Войти
        </NavLink>
      </div>
    </>
  );
};

export default Registration;
