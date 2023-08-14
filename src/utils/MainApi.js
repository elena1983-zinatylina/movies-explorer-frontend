const BASE_URL = 'https://api.diplom.zee.nomoreparties.sbs';

const headers = {
  'Content-Type': 'application/json',
  Authorization: '',
};

const handleResponce = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const setToken = (token) => {
  headers.Authorization = `Bearer ${token}`;
};

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleResponce);
};

export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleResponce);
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers,
  }).then(handleResponce);
};

export const updateUserInfo = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ email, name }),
  }).then(handleResponce);
};

export const savedMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers,
    body: JSON.stringify(movie),
  }).then(handleResponce);
};

export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers,
  }).then(handleResponce);
};


export const getAllFilms = () => {
  return fetch(`${BASE_URL}/movies`, {
    headers,
  }).then(handleResponce);
}