class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getAllCards() {
    return fetch(this.url + "cards", {
      headers: this.headers
    })
      .then((res) => this._getResponseData(res));
  }

  addCard(data) {
    return fetch(this.url + "cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(this.url + "cards/" + cardId, {
      method: "DELETE",
      headers: this.headers
    })
      .then((res) => this._getResponseData(res));
  }

  getUser() {
    return fetch(this.url + "users/me", {
      headers: this.headers
    })
      .then((res) => this._getResponseData(res));
  }

  editUser(name, about) {
    return fetch(this.url + "users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => this._getResponseData(res));
  }

  changeAvatar(link) {
    return fetch(this.url + "users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then((res) => this._getResponseData(res));
  }

  addLike(cardId) {
    return fetch(this.url + "cards/likes/" + cardId, {
      method: "PUT",
      headers: this.headers
    })
      .then((res) => this._getResponseData(res));
  }

  removeLike(cardId) {
    return fetch(this.url + "cards/likes/" + cardId, {
      method: "DELETE",
      headers: this.headers
    })
      .then((res) => this._getResponseData(res));
  }
}


const fetchConfig = {
  url: "https://api.olegz.nomoredomains.rocks/",
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
};

const api = new Api(fetchConfig);

export default api;