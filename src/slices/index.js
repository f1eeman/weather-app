import { combineReducers } from 'redux';
import usersInfoReducer, {
  addUser,
  removeCurrentUser,
  setLogin,
  setEmail,
  changeLoggingStatus,
  setFavoriteCities,
  addCity,
  removeCity,
} from './users.js';
import citiesWeatherReducer, {
  getCityWeatherInfo,
  resetAllCitiesWeaherInfo,
} from './citiesWeather.js';

const actions = {
  addUser,
  removeCurrentUser,
  setLogin,
  setEmail,
  changeLoggingStatus,
  setFavoriteCities,
  addCity,
  removeCity,
  getCityWeatherInfo,
  resetAllCitiesWeaherInfo,
};

const rootReducer = combineReducers({
  usersInfo: usersInfoReducer,
  citiesWeather: citiesWeatherReducer,
});

export { actions };

export default rootReducer;
