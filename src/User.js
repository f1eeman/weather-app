class User {
  constructor(id, login, email, password, favoritesItems = []) {
    this.id = id;
    this.login = login;
    this.email = email;
    this.password = password;
    this.favoritesItems = favoritesItems;
  }

  getUserId() {
    return this.id;
  }

  getUserLogin() {
    return this.login;
  }

  getUserEmail() {
    return this.email;
  }

  getUserPassword() {
    return this.password;
  }

  getUserFavoritesItems() {
    return this.favoritesItems;
  }
}

export default User;
