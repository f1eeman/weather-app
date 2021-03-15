import parse from './parser.js';

class DataBaseApi {
  constructor(dataBase) {
    this.dataBase = dataBase;
  }

  isInit() {
    const rawData = this.dataBase.getItem('isDataBaseInit');
    const isDataBaseInit = parse('json', rawData);
    return isDataBaseInit;
  }

  initDataBase() {
    this.dataBase.clear();
    const users = parse('object', []);
    const currentUser = parse('object', null);
    const isDataBaseInit = parse('object', true);
    this.dataBase.setItem('isDataBaseInit', isDataBaseInit);
    this.dataBase.setItem('users', users);
    this.dataBase.setItem('currentUser', currentUser);
  }

  addUser(user) {
    const rawData = this.dataBase.getItem('users');
    const users = parse('json', rawData);
    users.push(user);
    const preparedDataForWriting = parse('object', users);
    this.dataBase.setItem('users', preparedDataForWriting);
  }

  getAllUsers() {
    const rawData = this.dataBase.getItem('users');
    const users = parse('json', rawData);
    return users;
  }

  setCurrentUser(user) {
    const preparedDataForWriting = parse('object', user);
    this.dataBase.setItem('currentUser', preparedDataForWriting);
  }

  getCurrentUser() {
    const rawData = this.dataBase.getItem('currentUser');
    const currentUser = parse('json', rawData);
    return currentUser;
  }

  addUserFavoriteCity(city) {
    const rawData = this.dataBase.getItem('currentUser');
    const allUsers = this.getAllUsers();
    const currentUser = parse('json', rawData);
    currentUser.favoriteCities.push(city);
    allUsers.forEach((user) => {
      if (user.login === currentUser.login) {
        user.favoriteCities.push(city);
      }
    });
    const preparedDataForWriting1 = parse('object', currentUser);
    const preparedDataForWriting2 = parse('object', allUsers);
    this.dataBase.setItem('currentUser', preparedDataForWriting1);
    this.dataBase.setItem('users', preparedDataForWriting2);
  }

  removeUserFavoriteCity(id) {
    const rawData = this.dataBase.getItem('currentUser');
    const allUsers = this.getAllUsers();
    const currentUser = parse('json', rawData);
    const filteredFavoriteCities = currentUser.favoriteCities.filter((city) => city.id !== id);
    currentUser.favoriteCities = filteredFavoriteCities;
    allUsers.forEach((user) => {
      if (user.login === currentUser.login) {
        // eslint-disable-next-line no-param-reassign
        user.favoriteCities = filteredFavoriteCities;
      }
    });
    const preparedDataForWriting1 = parse('object', currentUser);
    const preparedDataForWriting2 = parse('object', allUsers);
    this.dataBase.setItem('currentUser', preparedDataForWriting1);
    this.dataBase.setItem('users', preparedDataForWriting2);
  }

  removeCurrentUser() {
    const currentUser = parse('object', null);
    this.dataBase.setItem('currentUser', currentUser);
  }

  reset() {
    this.dataBase.clear();
  }
}

export default DataBaseApi;
