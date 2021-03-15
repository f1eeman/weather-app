import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import storage from '../storage.js';
import { actions as slicesActions } from '../slices/index.js';
import getDefaultCities from '../defaultCities.js';

const FavoriteCities = () => {
  // console.log('FavoriteCities Comp');
  const dispatch = useDispatch();
  const { currentUserCities, citiesWheaterInfoList } = useSelector((state) => (
    {
      currentUserCities: state.usersInfo.currentUser.favoriteCities,
      citiesWheaterInfoList: state.citiesWeather.weatherInfoList,
    }
  ));
  const defaultCities = getDefaultCities();
  const commonCities = [...defaultCities, ...currentUserCities];
  // console.log('commonCities', commonCities);

  useEffect(() => {
    const fetchData = () => {
      commonCities.forEach(async ({ cityName, removable }) => {
        await dispatch(slicesActions.getCityWeatherInfo({ cityName, removable }));
      });
    };
    fetchData();
    return () => {
      dispatch(slicesActions.resetAllCitiesWeaherInfo());
    };
  }, []);

  const handleRemoveFromFavorite = (id) => () => {
    storage.removeUserFavoriteCity(id);
    dispatch(slicesActions.removeCity({ id }));
    dispatch(slicesActions.removeCityWeather({ id }));
  };

  const renderRemoveButton = (id) => (
    <button
      className="favorite-cities__remove-button"
      type="button"
      onClick={handleRemoveFromFavorite(id)}
    >
      Убрать из избранного
    </button>
  );

  const renderCitiesWeatherList = () => {
    const fuck = 'fuck';
    return (
      <ul className="favorite-cities__list slider__list">
        {citiesWheaterInfoList.map((cityWeather) => {
          const {
            removable,
            name,
            id,
            temp,
            feelsLike,
            pressure,
            humidity,
            cloudiness,
            condition,
          } = cityWeather;
          return (
            <li key={id} className="favorite-cities__item slider__item">
              <article className="favorite-cities__city-info city-info">
                <h3 className="city-info__title">{name}</h3>
                <dl className="city-info__table">
                  <dt className="city-info__key">Сейчас</dt>
                  <dd className="city-info__value">{condition}</dd>
                  <dt className="city-info__key">Облачность</dt>
                  <dd className="city-info__value">{cloudiness}</dd>
                  <dt className="city-info__key">Температура</dt>
                  <dd className="city-info__value">{temp}</dd>
                  <dt className="city-info__key">Ощущается как</dt>
                  <dd className="city-info__value">{feelsLike}</dd>
                  <dt className="city-info__key">Давление</dt>
                  <dd className="city-info__value">{pressure}</dd>
                  <dt className="city-info__key">Влажность</dt>
                  <dd className="city-info__value">{humidity}</dd>
                </dl>
              </article>
              {removable && renderRemoveButton(id)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <section className="page-main__favorite-cities favorite-cities slider">
      <h2 className="visually-hidden">Избранные города</h2>
      <div className="container">
        {renderCitiesWeatherList()}
      </div>
    </section>
  );
};

export default FavoriteCities;
