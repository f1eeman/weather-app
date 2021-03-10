import { combineReducers } from 'redux';
import usersInfoReducer, {
  addUser,
  removeCurrentUser,
  addQuery,
  setLogin,
  setEmail,
  setFavoriteCities,
  addCity,
  removeCity,
} from './users.js';
import citiesWeatherReducer, {
  getCityWeatherInfo,
} from './citiesWeather.js';

const actions = {
  addUser,
  removeCurrentUser,
  addQuery,
  setLogin,
  setEmail,
  setFavoriteCities,
  addCity,
  removeCity,
  getCityWeatherInfo,
};

const rootReducer = combineReducers({
  usersInfo: usersInfoReducer,
  citiesWeather: citiesWeatherReducer,
});

export { actions };

export default rootReducer;
