export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _errorCheck(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._errorCheck)
  }
  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._errorCheck)
  }
  setUserData(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._errorCheck)
  }

  setUserAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    })
    .then(this._errorCheck)
  }

  addNewPicture(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._errorCheck)
  }
}
