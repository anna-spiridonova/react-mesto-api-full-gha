const baseUrl = "https://api.mesto.project.nomoredomains.rocks";
// const baseUrl = 'http://localhost:3001';


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
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
};

export const signOut = () => {
  return request("/signout", {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
};

export const getContent = () => {
  return request("/users/me", {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  })
};