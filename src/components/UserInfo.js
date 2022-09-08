export class UserInfo {
  constructor(data) {
    this._userName = document.querySelector(data.name);
    this._userAbout = document.querySelector(data.about);
    this._userAvatar = document.querySelector(data.avatar)
  }
  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    }
    return this._userData
  }
  setUserInfo(item) {
    if (item.name && item.about) {
      this._userName.textContent = item.name;
      this._userAbout.textContent = item.about;
    }
    this.setAvatar(item);
  }

  setAvatar(data) {
    if (data.avatar) {
      this._userAvatar.src = data.avatar;
    }
  }
}
