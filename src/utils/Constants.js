export const BASE_URL = 'https://api.diplom.zee.nomoreparties.sbs';
export const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const checkResponse = (res) => {
   if (res.ok) {
      return res.json()
   }
   return Promise.reject(`Ошибка: ${res.status}`)
};

// Переменные ширины экрана
const MAX_WIDTH_1280 = 1280;
const MIDDLE_WIDTH_768 = 768;
const MIN_WIDTH_480 = 480;
// Переменные количества отображаемых фильмов, зависит от ширины экрана
const INITIAL_CARDS_12 = 12;
const INITIAL_CARDS_8 = 8;
const INITIAL_CARDS_6 = 6;
const IINITIAL_CARDS_5 = 5;
// Переменные сколько будет добавлено фильмов, зависит от ширины экрана
const MORE_CARDS_3 = 3;
const MORE_CARDS_2 = 2;
const MORE_CARDS_1 = 1;

export {
   MAX_WIDTH_1280,
   MIDDLE_WIDTH_768,
   MIN_WIDTH_480,
   INITIAL_CARDS_12,
   INITIAL_CARDS_8,
   INITIAL_CARDS_6,
   IINITIAL_CARDS_5,
   MORE_CARDS_3,
   MORE_CARDS_2,
   MORE_CARDS_1
};