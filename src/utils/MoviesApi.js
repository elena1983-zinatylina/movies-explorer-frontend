class MoviesApi {
    constructor({ url, headers }) {
      this._url = url;
      this._headers = headers;
    }
  
  /**Обработать ответ*/
    _handleResponce(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    }
  
    /**Загрузить фильмы с сервера*/
    getAllMovies() {
      return fetch(`${this._url}`,{ 
        headers: this._headers 
      })
        .then(this._handleResponce)
    }
  }
  
  const moviesApi = new MoviesApi({
    url: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
      "content-type": "application/json",
      "Authorization": "",
    }
  })
  
  export default moviesApi