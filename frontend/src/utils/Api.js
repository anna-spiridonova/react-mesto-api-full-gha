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
      headers: this._headers,
      credentials: 'include',
    })
  }

  addNewCard(name, link) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include',
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
      credentials: 'include',
      method: 'DELETE'
    })
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
  }

  editProfileInfo(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
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
      credentials: 'include',
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
        credentials: 'include',
        method: 'PUT',
      })
    }else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: this._headers,
        credentials: 'include',
        method: 'DELETE',
      })
    }
  }
}

export const api = new Api({
  // baseUrl: 'http://localhost:3001',
  baseUrl: 'https://api.mesto.project.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json'
  }
});
