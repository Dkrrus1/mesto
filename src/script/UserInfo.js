export class UserInfo {
  constructor (data) {
    this._userName = document.querySelector(data.name);
    this._userInfo = document.querySelector(data.info)
  }
  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }
    return this._userData
  }
  setUserInfo(item) {
    this._userName.textContent = item.name;
    this._userInfo.textContent = item.profession;
  }
}
