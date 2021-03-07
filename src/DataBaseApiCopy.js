import parse from './parse.js';

class DataBaseApi {
  constructor(dataBase) {
    this.dataBase = dataBase;
  }

  initDataBase() {
    const users = parse('object', []);
    const currentUser = parse('object', null);
    this.dataBase.setValue('users', users);
    this.dataBase.setValue('currentUser', currentUser);
  }

  addUser(user) {
    const rawData = this.dataBase.getValue('users');
    const users = parse('json', rawData);
    users.push(user);
    const preparedDataForWriting = parse('object', users);
    this.dataBase.setValue('users', preparedDataForWriting);
  }

  getAllUsers() {
    const rawData = this.dataBase.getValue('users');
    const users = parse('json', rawData);
    return users;
  }

  setCurrentUser(user) {
    this.dataBase.setValue('currentUser', user);
  }

  getCurrentUser() {
    const rawData = this.dataBase.getValue('currentUser');
    const currentUser = parse('json', rawData);
    return currentUser;
  }

  reset() {
    this.dataBase.deleteValues();
  }
}

export default DataBaseApi;
