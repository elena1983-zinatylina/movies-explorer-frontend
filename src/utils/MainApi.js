class MainApi {
    constructor({ url, headers }) {
      this._url = url;
      this._headers = headers;
    }
  
    /**Обработать ответ*/
    _handleReply(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    /**Установить токен*/
    setToken(token) {
      this._headers.Authorization = `Bearer ${token}`;
    }
  
    /**Загрузить данные пользователя с сервера*/
    getUserInfo() {
      return fetch(`${this._url}/users/me`, { headers: this._headers })
        .then(this._handleReply)
    }
  
    /**Редактировать профиль*/
    updateUserInfo({ name, email }) {
      return fetch(`${this._url}/users/me`,
        {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({ name, email })
        })
        .then(this._handleReply)
    }
  
    /**Получить все карточки*/
    getAllCards() {
      return fetch(`${this._url}/movies`, {
        headers: this._headers
      })
        .then(this._handleResponce)
    }
  
    /**Удалить карточку*/
    deleteMovie(id) {
      return fetch(`${this._url}/movies/${id}`,
        {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(this._handleResponce)
    }
  
    /**Сохранить карточку*/
    savedMovie(card) {
      return fetch(`${this._url}/movies`,
        {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(card)
        })
        .then(this._handleResponce)
    }
  }
  
  const mainApi = new MainApi({
    url: 'http://localhost:3000',
    //url: 'https://api.diplom.zee.nomoreparties.sbs',
    headers: {
      'content-type': 'application/json',
      Authorization: '',
    },
  });
  
  export default mainApi;