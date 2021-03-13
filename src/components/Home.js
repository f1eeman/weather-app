import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import storage from '../storage.js';
// import routes from '../../routes.js';
import { actions as slicesActions } from '../slices/index.js';
import FavoriteCities from './FavoriteCities.js';
import Header from './Header.js';
import Spinner from './Spinner.js';
import getDefaultCities from '../defaultCities.js';

const Home = () => {
  // console.log('Home Comp');
  const { currentUserCities } = useSelector((state) => (
    { currentUserCities: state.usersInfo.currentUser.favoriteCities }
  ));
  const defaultCities = getDefaultCities();
  const commonCities = [...defaultCities, ...currentUserCities].map(
    ({ cityName }) => cityName.toUpperCase(),
  );

  const dispatch = useDispatch();
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
        .matches(
          /^[a-zA-Zа-яА-Я\s]+$/,
          'Нельзя использовать специальные символы и цифры',
        )
        .notOneOf(commonCities, 'Информация о даннном городе уже имеется'),
    }),
    onSubmit: async (values, actions) => {
      const { body } = values;
      const resultAction = await dispatch(
        slicesActions.getCityWeatherInfo({ cityName: body, removable: true }),
      );
      actions.resetForm();
      if (slicesActions.getCityWeatherInfo.fulfilled.match(resultAction)) {
        const { payload: { weatherInfo: { id } } } = resultAction;
        const city = { cityName: body, removable: true, id };
        storage.addUserFavoriteCity(city);
        dispatch(slicesActions.addCity({ city }));
      } else if (resultAction.payload) {
        actions.setErrors({ body: `Название города указано неверно: "${body}"` });
      } else {
        actions.setErrors({ body: 'Упс, что-то пошло не так! Попробуйте снова.' });
      }
    },
  });

  const handleBlur = (e) => {
    formik.handleBlur(e);
    const trimmedValue = (e.target.value || '').trim();
    formik.setFieldValue(e.target.name, trimmedValue);
  };

  const handleChange = (e) => {
    formik.handleChange(e);
    const trimmedValue = (e.target.value || '').toUpperCase();
    formik.setFieldValue(e.target.name, trimmedValue);
  };

  const renderButton = () => (
    <button type="submit" disabled={formik.isSubmitting}>
      {formik.isSubmitting ? <Spinner /> : 'Отправить'}
    </button>
  );

  const renderFeedBack = () => (
    <>
      {formik.errors.body && (
        <p className="search-form__feedback feedback--validation">{formik.errors.body}</p>
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={formik.isSubmitting}
                    className="search-form__control"
                    id="city-name"
                    name="body"
                    type="text"
                    placeholder="НОВОСИБИРСК"
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
