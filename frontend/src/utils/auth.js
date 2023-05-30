const baseUrl = "https://auth.nomoreparties.co";

export const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

function request(endpoint, options) {
  return fetch(`${baseUrl}${endpoint}`, options)
    .then(handleResponse)
}

export const register = (email, password) => {
  return request("/signup", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
};

export const authorize = (email, password) => {
  return request("/signin", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
};

export const getContent = (token) => {
  return request("/users/me", {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
};