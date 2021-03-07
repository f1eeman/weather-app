import React, { useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import axios from 'axios';
// import routes from '../../routes.js';
// import { actions as slicesActions } from '../../slices';
import FavoriteCities from './FavoriteCities.js';
import Header from './Header.js';
import Spinner from './Spinner.js';

const Home = () => {
  // const channels = useSelector((state) => state.channelsInfo.channels);
  // const dispatch = useDispatch();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup
        .string()
        .required('Поле является обязательным к заполнению')
        .trim('Не должно быть пробелов в начале и конце строки')
        .strict(true),
      // .notOneOf(loginsList, 'Логин уже занят'),
    }),
    onSubmit: (values, actions) => {
      console.log(values, actions);
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
      <Header />
      <main className="page-main">
        <h1 className="visually-hidden">Главная страница сервиса прогноза погоды</h1>
        <section className="page-main__search-city search-city">
          <h2 className="visually-hidden">Форма поиска города</h2>
          <div className="container">
            <form className="search-city__form search-form" onSubmit={formik.handleSubmit}>
              <div className="search-form__wrapper">
                <div className="search-form__input-wrapper">
                  <label className="visually-hidden" htmlFor="city-name">Укажите название города</label>
                  <input
                    ref={inputRef}
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    className="search-form__control"
                    id="city-name"
                    name="city-name"
                    type="text"
                    placeholder="Введите название города..."
                  />
                  {renderFeedBack()}
                </div>
                {renderButton()}
              </div>
            </form>
          </div>
        </section>
        <FavoriteCities />
      </main>
    </>
  );
};

export default Home;
