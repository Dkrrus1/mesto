export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this._authToken = options.headers.authorization;
    this._cardsUrl = (this.baseUrl + '/cards');
    this._userUrl = (this.baseUrl + '/users/me');
  }
  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: this._authToken
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  getUserData() {
    return fetch(this._userUrl, {
      headers: {
        authorization: this._authToken
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  setUserData(data) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }
  addNewPicture(data) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(id) {

  }
}
