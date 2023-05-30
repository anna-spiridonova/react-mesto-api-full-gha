class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options)
      .then(this._handleResponse)
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  addNewCard(name, link) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  editProfileInfo(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  editAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'PUT',
      })
    }else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'DELETE',
      })
    }
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'fb38f326-6de2-4957-880b-2bd78fd7f96a',
    'Content-Type': 'application/json'
  }
});
