import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

const FavoriteCities = () => {
  console.log('favoriteCities');
  return (
    <section className="page-main__favorites-cities favorites-cities slider">
      <h2 className="visually-hidden">Избранные города</h2>
      <ul className="favorites-cities__list slider__list">
        <li className="favorites-cities__item slider__item">1</li>
        <li className="favorites-cities__item slider__item">2</li>
        <li className="favorites-cities__item slider__item">3</li>
        <li className="favorites-cities__item slider__item">4</li>
        <li className="favorites-cities__item slider__item">5</li>
      </ul>
    </section>
  );
};

export default FavoriteCities;
