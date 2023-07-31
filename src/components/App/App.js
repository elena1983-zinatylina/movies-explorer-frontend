import './App.css';
import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import {Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ErrorPage from '../ErrorPage/ErrorPage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi'
//import Header from '../Header/Header';
//import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';

function App() {

    //* Переменные состояния по пользователю
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isUserDataUpdateStatus, setIsUserDataUpdateStatus] = useState('');
  
    //* Переменные состояния ошибок и загрузок
    const [errorMessage, setErrorMessage] = useState();
    const [isServerError, setIsServerError] = useState(false); //Произошла ошибка при поиске фильмов
    const [isNotFound, setIsNotFound] = useState(false); // Фильмы по запросу не найдены
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  
    //* Переменные состояния по фильмам
    const [allMovies, setAllMovies] = useState([]); // Данные всех фильмов
    const [initialMovies, setInitialMovies] = useState([]); // Список найденных фильмов
    const [foundMovies, setFoundMovies] = useState([]); // Список фильмов по критериям
    const [savedMovies, setSavedMovies] = useState([]); // Сохраненные фильмы
    const [allSavedMovies, setAllSavedMovies] = useState(savedMovies)
    const [filteredMovies, setFilteredMovies] = useState(allSavedMovies);
  
    //* Переменные состояния для формы поиска фильмов
    const [selectedCheckbox, setSelectedCheckbox] = useState(false); // Флажок короткометражек не выбран
    const [searchKeyword, setSearchKeyword] = useState('') // Ключевое слово
    const [checkboxSavedMovies, setCheckboxSavedMovies] = useState(false);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      handleTokenCheck();
    }, []);
  

  const cardsTotal = 16;
  const cardsTotalSave = 4;
 // const cards = Array(cardsTotal).fill(null);
  //const saveCards = Array(cardsTotalSave).fill(null);
  //!                    Фильтрование фильмов"                    !

  //* Найдем фильмы по ключевому слову
  const findMovies = (movies, keyword, checkbox) => {
    const moviesКeywordSearch = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) || movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
    })
    if (checkbox) {
      return searchShortMovies(moviesКeywordSearch);
    } else {
      return moviesКeywordSearch;
    }
  }

  //* Поиск короткометражныx фильмов
  const searchShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration <= 40);
  };

  //!                    Действия с фильмами на странице "Сохраненные фильмы"                    !

  //* Отслеживаем наличие сохраненных фильмов
  useEffect(() => {
    if (savedMovies.length !== 0) {
      setIsNotFound(false)
    } else {
      setIsNotFound(true)
    }
  }, [savedMovies])

  //* Отслеживание состояние стэйта чекбокса
  useEffect(() => {
    if (localStorage.getItem('checkboxSavedMovies') === 'true') {
      setCheckboxSavedMovies(true)
      setAllSavedMovies(searchShortMovies(savedMovies))
    } else {
      setCheckboxSavedMovies(false)
      setAllSavedMovies(savedMovies)
    }
  }, [savedMovies]);

  //* Меняем состояние чекбокса на короткометражки
  function handleChangeCheckboxSavedMovies() {
    if (!checkboxSavedMovies) {
      setCheckboxSavedMovies(true)
      localStorage.setItem('checkboxSavedMovies', true);
      setAllSavedMovies(searchShortMovies(filteredMovies));
      if (searchShortMovies(filteredMovies).length === 0) {
        setIsNotFound(true)
      }
      setIsNotFound(false)
    } else {
      setCheckboxSavedMovies(false)
      localStorage.setItem('checkboxSavedMovies', false);
      if (filteredMovies.length === 0) {
        setIsNotFound(true)
      }
      setIsNotFound(false)
      setAllSavedMovies(filteredMovies)
    }
  }

  //* Поиск фильмов из сохраненных ранее по ключевому слову
  function handleSearchSavedMovies(keyword) {
    if (findMovies(savedMovies, keyword, checkboxSavedMovies).length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
      setFilteredMovies(findMovies(savedMovies, keyword, checkboxSavedMovies))
      setAllSavedMovies(findMovies(savedMovies, keyword, checkboxSavedMovies))
    }
  }

  //!                    Действия с фильмами на странице "Фильмы"                    !

  //* Отслеживание состояния стэйтов
  useEffect(() => {
    setSearchKeyword(localStorage.getItem('searchKeyword' || ''));
    setSelectedCheckbox(localStorage.getItem('selectedCheckbox' || '') === 'true');
    if (localStorage.getItem('foundMovies')) {
      const movies = JSON.parse(
        localStorage.getItem('foundMovies')
      );
      setInitialMovies(movies);
      if (localStorage.getItem('selectedCheckbox') === 'true') {
        setFoundMovies(searchShortMovies(movies));
      } else {
        setFoundMovies(movies);
      }
    }
  }, []);

  //* Меняем состояние чекбокса на короткометражки
  const handleChangeCheckbox = () => {
    setSelectedCheckbox(!selectedCheckbox);
    console.log(selectedCheckbox)
    if (!selectedCheckbox) {
      setFoundMovies(searchShortMovies(initialMovies));
      if (foundMovies.length === 0) {
        setIsNotFound(true);
      }
    } else {
      setFoundMovies(initialMovies);
    }
    localStorage.setItem('selectedCheckbox', !selectedCheckbox);
  };

  //* Найдем фильмы по критериям
  const handleSetFoundMovies = (movies, keyword, checkbox) => {
    setIsLoading(true);
    const moviesList = findMovies(movies, keyword, false);
    if (moviesList.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    setInitialMovies(moviesList);
    setFoundMovies(
      checkbox ? searchShortMovies(moviesList) : moviesList
    );
    localStorage.setItem('foundMovies', JSON.stringify(moviesList));
    setTimeout(() => setIsLoading(false), 1000)
  }

  //* Проверить сохранен ли фильм
  const isSavedMovies = (movie) => {
    return savedMovies.some(item => item.movieId === movie.id && item.owner === currentUser._id)
  }

  //!                    Запросы к серверу по фильмам                    !

  //- Обработаем запрос пользователя по поиску фильмов
  const handleRequestMovies = (keyword) => {
    localStorage.setItem('searchKeyword', keyword); // Записываем в сторедж введенное ключевое слово
    localStorage.setItem('selectedCheckbox', selectedCheckbox); // Записываем в сторедж выставленное положение флажка
    if (allMovies.length === 0) { // если фильмов в сторедж нет, сделаем запрос к BeatfilmMoviesApi
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((movies) => {
          setIsLoading(true);
          localStorage.setItem('allMovies', JSON.stringify(movies)); // Записываем в сторедж все полученные фильмы с BeatfilmMoviesApi
          setAllMovies(movies);
          handleSetFoundMovies(movies, keyword, selectedCheckbox) // Находим фильмы по запросу и выставленным критериям
        })
        .catch((err) => {
          setIsServerError(true)
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 1000)
        });
    } else {
      handleSetFoundMovies(allMovies, keyword, selectedCheckbox);
    }
  };

  //- Обработать запрос на сохранение фильма на страницу "Сохраненные фильмы"
  const handleSaveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    mainApi.saveMovie(movie, jwt)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  //- Обработать запрос на удаления фильма с страницы "Сохраненные фильмы"
  function handleDeleteMovie(movie) {
    const jwt = localStorage.getItem('jwt');
    const deleteCard = savedMovies.find(item => item.movieId === (movie.id || movie.movieId) && item.owner === currentUser._id)
    if (!deleteCard) return
    mainApi.deleteMovie(deleteCard._id, jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(c => c._id !== deleteCard._id))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //!                    Запросы к серверу по юзеру                    !

  //- Регистрация пользователя
  const handleRegistration = ({ name, email, password }) => {
    mainApi.register({ name, email, password })
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          console.log(err)
          setErrorMessage('Пользователь с таким email уже зарегистрирован')
        } else {
          setErrorMessage('Переданы некорректные данные');
        }
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 2000);
      });
  }

  //- Авторизация пользователя
  const handleAuthorization = ({ email, password }) => {
    mainApi.authorize({ email, password })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          handleTokenCheck()
          navigate.push('./movies');
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setErrorMessage('Неверный email или пароль')
        } else {
          setErrorMessage('Что-то пошло не так...');
        }
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        setCurrentUser(null);
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 2000);
      });
  }

  //- Проверяем токен пользователя и получение его контента
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    mainApi
      .getUserInfo(jwt)
      .then((data) => {
        setCurrentUser(data)
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      })
    mainApi
      .getSavedMovies(jwt)
      .then((data) => {
        setLoggedIn(true);
        setSavedMovies(data)
      })
      .catch((err) => {
        console.log(err);
      })
  };

  //- Изменить данные пользователя в профиле

  const handleUpdateUserData = (data) => {
    const jwt = localStorage.getItem('jwt');
    mainApi.updateUserInfo(data, jwt)
      .then((res) => {
        setCurrentUser(res.data)
        setIsUserDataUpdateStatus('Данные успешно обновлены!')
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setIsUserDataUpdateStatus('Пользователь с таким email уже зарегистрирован')
        } else {
          setIsUserDataUpdateStatus('Что-то пошло не так...');
        }
      })
      .finally(() => {
        setTimeout(() => setIsUserDataUpdateStatus(''), 2000);
      });
  }

  //- Выйти из аккаунта
  const handleSignOut = () => {
    localStorage.clear()
    setLoggedIn(false);
    navigate.push('/');
    setInitialMovies([]);
    setSavedMovies([]);
    setFoundMovies(false);
    setSelectedCheckbox(false)
    setSearchKeyword('')
    setFoundMovies([])
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="app">
  
      <Routes>
      <Route  path='/'
      element={<Main/>}/>
            <Route
            element={ <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={loggedIn}
            movies={foundMovies}
            isLoading={isLoading}
            onCheckbox={handleChangeCheckbox}
            checked={selectedCheckbox}
            isNotFound={isNotFound}
            isServerError={isServerError}
            onSubmit={handleRequestMovies}
            searchKeyword={searchKeyword}
            onSaveMovie={handleSaveMovie}
            onDeleteMovie={handleDeleteMovie}
            isSavedMovies={isSavedMovies}
            savedMovies={savedMovies}
          />}/>
          <Route
          element={ <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            onDeleteMovie={handleDeleteMovie}
            isSavedMovies={isSavedMovies}
            savedMovies={savedMovies}
            isNotFound={isNotFound}
            movies={allSavedMovies}
            onCheckbox={handleChangeCheckboxSavedMovies}
            onSubmit={handleSearchSavedMovies}
            checked={checkboxSavedMovies}
          />}/>
           <Route
          element={ <ProtectedRoute
            path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            onUpdateUserData={handleUpdateUserData}
            onSignOut={handleSignOut}
            isUserDataUpdateStatus={isUserDataUpdateStatus}
          />}/>
          <Route 
           path='/signin'
           element={!loggedIn ? (
             <Login onLogin={handleAuthorization} errorMessage={errorMessage} />
            ) : (
              <Navigate to='/' />
            )}/>
          <Route
           path='/signup'
          element={!loggedIn ? (
              <Register onRegister={handleRegistration} errorMessage={errorMessage} />
            ) : (
              <Navigate to='/' />
            )}
          />
          <Route path='*'
            element={ <ErrorPage />}
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;