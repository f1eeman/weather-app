import parse from './parse.js';

class DataBaseApi {
  constructor(dataBase) {
    this.dataBase = dataBase;
  }

  initDataBase() {
    const users = parse('object', []);
    const currentUser = parse('object', null);
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
    this.dataBase.setItem('currentUser', user);
  }

  getCurrentUser() {
    const rawData = this.dataBase.getItem('currentUser');
    const currentUser = parse('json', rawData);
    return currentUser;
  }

  reset() {
    this.dataBase.clear();
  }
}

export default DataBaseApi;
