export const BASE_URL = 'https://api.diplom.zee.nomoreparties.sbs'


const makeRequest = (url, method, body, token) => {
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
};