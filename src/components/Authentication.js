import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import routes from '../../routes.js';
// import { actions as slicesActions } from '../../slices';
import Spinner from './Spinner.js';

const Registration = () => {
  // const channels = useSelector((state) => state.channelsInfo.channels);
  const dispatch = useDispatch();
  const loginFieldRef = useRef(null);
  useEffect(() => {
    loginFieldRef.current.focus();
  }, []);
  const handleGoToRegistrationPage = () => {
    // dispatch(slicesActions.hideModal());
  };
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
      password: Yup
        .string()
        .min(8, 'Количество символов должно быть не меньше 8')
        .required(' Поле является обязательным к заполнению')
        .trim('Не должно быть пробелов в начале и конце строки'),
    }),
    onSubmit: async (values, actions) => {
      const channelInfo = { name: values.body };
      const path = routes.channelsPath();
      try {
        await axios.post(
          path, { data: { attributes: channelInfo } },
        );
        dispatch(slicesActions.hideModal());
      } catch (e) {
        actions.setErrors({ body: t('networkError') });
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
        <p className="">Еще нет аккаунта? Перейдите по ссылке для регистрации</p>
        <a
          className=""
          onClick={handleGoToRegistrationPage}
          disabled={formik.isSubmitting}
          href=""
        >
          Зарегистрироваться
        </a>
      </div>
    </>
  );
};

export default Registration;
