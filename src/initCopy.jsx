import { uniqueId } from 'lodash';
import DataBaseApi from './DataBaseApi.js';
import User from './User.js';

const initApp = () => {
  const storage = {
    dataBase: localStorage,
    getValue(key) {
      return this.dataBase.getItem(key);
    },
    setValue(key, value) {
      return this.dataBase.setItem(key, value);
    },
    deleteValues() {
      return this.dataBase.clear();
    },
  };
  const dataBaseApi = new DataBaseApi(localStorage);
  const currentUserId = dataBaseApi.getCurrentUser();
  console.log(currentUserId);
};

export default initApp;
