import parse from './parse.js';

class DataBaseApi {
  constructor(dataBase) {
    this.dataBase = dataBase;
  }

  isInit() {
    console.log(this.dataBase.length);
    return this.dataBase.length > 0;
  }

  initDataBase() {
    const users = parse('object', []);
    const currentUser = parse('object', null);
    console.log('initDataBase users', users);
    console.log('initDataBase currentUser', currentUser);
    this.dataBase.setItem('users', users);
    this.dataBase.setItem('currentUser', currentUser);
  }

  addUser(user) {
    const rawData = this.dataBase.getItem('users');
    console.log('DATABASEAPI rawData', rawData);
    const users = parse('json', rawData);
    console.log('DATABASEAPI users', users);
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
    console.log('DATABASEAPI user');
    console.log('DATABASEAPI preparedDataForWriting');
    this.dataBase.setItem('currentUser', preparedDataForWriting);
  }

  getCurrentUser() {
    const rawData = this.dataBase.getItem('currentUser');
    console.log('DATABASEAPI getCurrentUser rawData', rawData);
    const currentUser = parse('json', rawData);
    return currentUser;
  }

  reset() {
    this.dataBase.clear();
  }
}

export default DataBaseApi;
