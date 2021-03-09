import { combineReducers } from 'redux';
import usersInfoReducer, {
  addUser,
  removeCurrentUser,
  setLogin,
  setEmail,
  setFavoriteCities,
  addCity,
  removeCity,
} from './users.js';

const actions = {
  addUser,
  removeCurrentUser,
  setLogin,
  setEmail,
  setFavoriteCities,
  addCity,
  removeCity,
};

const rootReducer = combineReducers({
  usersInfo: usersInfoReducer,
});

export { actions };

export default rootReducer;
