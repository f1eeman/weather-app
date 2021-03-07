import { combineReducers } from 'redux';
import userInfoReducer, {
  setLogin,
  setEmail,
  addCity,
  removeCity,
} from './userInfo';

const actions = {
  setLogin,
  setEmail,
  addCity,
  removeCity,
};

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
});

export { actions };

export default rootReducer;
