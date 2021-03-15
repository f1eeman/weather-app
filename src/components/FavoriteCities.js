import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { chunk, uniqueId } from 'lodash';
import storage from '../storage.js';
import { actions as slicesActions } from '../slices/index.js';
import useWindowSize from '../useWindowSize.js';
import getDefaultCities from '../defaultCities.js';
import getItemsCount from '../itemsCount.js';

const FavoriteCities = () => {
  const { currentUserCities, citiesWheaterInfoList } = useSelector((state) => (
    {
      currentUserCities: state.usersInfo.currentUser.favoriteCities,
      citiesWheaterInfoList: state.citiesWeather.weatherInfoList,
    }
  ));
  const [currentIdx, setCurrentIdx] = useState(0);
  const size = useWindowSize();
  const slideElementsCount = getItemsCount(size.width);
  const chunkedCitiesWheaterList = chunk(citiesWheaterInfoList, slideElementsCount);
  const slidesCount = chunkedCitiesWheaterList.length;
  const dispatch = useDispatch();
  const defaultCities = getDefaultCities();
  const commonCities = [...defaultCities, ...currentUserCities];

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowSpecificSlide = (slideIndex) => () => {
    setCurrentIdx(slideIndex);
  };

  const handleShowNextSlide = () => {
    const nextIdx = ((currentIdx + 1) % slidesCount);
    setCurrentIdx(nextIdx);
  };

  const handleShowPrevSlide = () => {
    const prevIdx = (
      (currentIdx + (slideElementsCount - 1)) % slidesCount
    );
    setCurrentIdx(prevIdx);
  };

  const handleShowDetails = (e) => {
    e.preventDefault();
  };

  const handleRemoveFromFavorite = (id) => () => {
    storage.removeUserFavoriteCity(id);
    dispatch(slicesActions.removeCity({ id }));
    dispatch(slicesActions.removeCityWeather({ id }));
  };

  const renderPaginationButtons = () => {
    const buttons = Array(slidesCount)
      .fill(null)
      .map((__value, index) => (
        <button
          type="button"
          className="slider__pagination-btn"
          key={uniqueId()}
          onClick={handleShowSpecificSlide(index)}
        >
          <span className="visually-hidden">Показать слайд</span>
        </button>
      ));
    return buttons;
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

  const renderCitiesWeatherItems = (cityWeather) => {
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
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        className="favorite-cities__link"
        href=""
        onClick={handleShowDetails}
        key={id}
      >
        <article className="favorite-cities__item city-info">
          <h3 className="city-info__title">{name}</h3>
          <dl className="city-info__table">
            <dt className="city-info__key">Сейчас:</dt>
            <dd className="city-info__value">{condition}</dd>
            <dt className="city-info__key">Облачность:</dt>
            <dd className="city-info__value">{cloudiness}</dd>
            <dt className="city-info__key">Температура:</dt>
            <dd className="city-info__value">{temp}</dd>
            <dt className="city-info__key">Ощущается как:</dt>
            <dd className="city-info__value">{feelsLike}</dd>
            <dt className="city-info__key">Давление:</dt>
            <dd className="city-info__value">{pressure}</dd>
            <dt className="city-info__key">Влажность:</dt>
            <dd className="city-info__value">{humidity}</dd>
          </dl>
          {removable && renderRemoveButton(id)}
        </article>
      </a>
    );
  };

  const renderSliderList = () => (
    <ul className="favorite-cities__list slider__list">
      {chunkedCitiesWheaterList.map((chunkedElement, index) => {
        const classes = cn({
          slider__item: true,
          'slider__item--active': currentIdx === index,
        });
        return (
          <li key={uniqueId()} className={classes}>
            {chunkedElement.map(renderCitiesWeatherItems)}
          </li>
        );
      })}
    </ul>
  );

  const renderSliderButtons = () => (
    <>
      <button
        className="slider__button slider__button--prev button"
        type="button"
        onClick={handleShowPrevSlide}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#6C63FF" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M10.7903 4.3871L10.7071 4.29289C10.3466 3.93241 9.77939 3.90468 9.3871 4.2097L9.29289 4.29289L2.29289 11.2929L2.2515 11.3369L2.19633 11.4047L2.12467 11.5159L2.07123 11.6287L2.03585 11.734L2.00691 11.8819L2 12L2.00279 12.0752L2.02024 12.2007L2.04974 12.3121L2.09367 12.4232L2.146 12.5207L2.21969 12.6254L2.29289 12.7071L9.29289 19.7071C9.68342 20.0976 10.3166 20.0976 10.7071 19.7071C11.0676 19.3466 11.0953 18.7794 10.7903 18.3871L10.7071 18.2929L5.416 13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H5.414L10.7071 5.70711C11.0676 5.34662 11.0953 4.77939 10.7903 4.3871L10.7071 4.29289L10.7903 4.3871Z" />
        </svg>
        <span className="visually-hidden">
          Посмотреть предыдущую погоду
        </span>
      </button>
      <button
        className="slider__button slider__button--next button"
        type="button"
        onClick={handleShowNextSlide}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#6C63FF" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M13.2097 19.6129L13.2929 19.7071C13.6534 20.0676 14.2206 20.0953 14.6129 19.7903L14.7071 19.7071L21.7071 12.7071L21.7485 12.6631L21.8037 12.5953L21.8753 12.4841L21.9288 12.3713L21.9642 12.266L21.9931 12.1181L22 12L21.9972 11.9248L21.9798 11.7993L21.9503 11.6879L21.9063 11.5768L21.854 11.4793L21.7803 11.3746L21.7071 11.2929L14.7071 4.29289C14.3166 3.90237 13.6834 3.90237 13.2929 4.29289C12.9324 4.65338 12.9047 5.22061 13.2097 5.6129L13.2929 5.70711L18.584 11L3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13L18.586 13L13.2929 18.2929C12.9324 18.6534 12.9047 19.2206 13.2097 19.6129L13.2929 19.7071L13.2097 19.6129Z" />
        </svg>
        <span className="visually-hidden">
          Посмотреть следующую погоду
        </span>
      </button>
    </>
  );

  return (
    <section className="page-main__favorite-cities favorite-cities slider">
      <h2 className="visually-hidden">Избранные города</h2>
      <div className="container">
        <div className="slider__wrapper">
          <div className="slider__controls">
            <div className="slider__wrapper-nav-buttons">
              {renderSliderButtons()}
            </div>
            <div className="slider__wrapper-pug-buttons">
              {renderPaginationButtons()}
            </div>
          </div>
          <div className="slider__wrapper-list">
            {renderSliderList()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavoriteCities;
