/*export const BASE_URL = 'https://api.diplom.zee.nomoreparties.sbs'

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

export const registerUser = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleResponce);
};

export const authorizeUser  = (data) => {
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
*/














/*const makeRequest = (url, method, body, token) => {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers };

  if (token !== undefined) headers["Authorization"] = `Bearer ${token}`;
  if (body !== undefined) config.body = JSON.stringify(body);

  return fetch(`${BASE_URL}${url}`, config).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  });
};

export const registerUser = (name, email, password) => {
  return makeRequest("/signup", "POST", { name, email, password });
};

export const authorizeUser = (email, password) => {
  return makeRequest("/signin", "POST", { email, password });
};

export const getUserData = (token) => {
  return makeRequest("/users/me", "GET", undefined, token);
};*/