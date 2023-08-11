import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as apiAuth from "../../utils/apiAuth";
import  Main  from "../Main/Main";
import  Movies  from "../Movies/Movies";
import './App.css';
import  SavedMovies  from "../SavedMovies/SavedMovies";
import  NotFound  from "../NotFound/NotFound";
import Profile  from "../Profile/Profile";
import  Register  from "../Register/Register";
import  Login  from "../Login/Login";
import MainApi from "../../utils/MainApi.js";
import moviesApi from "../../utils/MoviesApi.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
//import ProtectedRouteForLoggedIn from "../ProtectedRouteForLoggedIn/ProtectedRouteForLoggedIn";
import {
  registerUser,
  authorizeUser,
  setToken,
  getUserInfo,
  updateUserInfo,
} from "../../utils/apiAuth";

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [profileChanged, setProfileChanged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [tokenExist, setTokenExist] = useState(true);
  const [apiMoviesList, setApiMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const jwt = localStorage.getItem("jwt");
  const isLoginPage = window.location.pathname === "/signin";
  const isSignupPage = window.location.pathname === "/signup";
  const isProfilePage = window.location.pathname === "/profile";
  const isSavedMoviesPage = window.location.pathname === "/saved-movies";
  const isMoviesPage = window.location.pathname === "/movies";

  //проверка токена, если токен есть получаем данные пользователя и список всех фильмов
  useEffect(() => {
    if (jwt) {
      Promise.all([
        apiAuth.setToken(jwt),
        moviesApi.getMovies(),
        MainApi.getSavedMovies(),
      ])
        .then(([userData, apiMovies, savedMovies]) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
          setApiMoviesList(apiMovies);
          setSavedMoviesList(savedMovies);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setTokenExist(false);
    }
  }, [jwt]);

  //сохранить фильм в избранное
  const saveMovie = (movieData, email) => {
    MainApi.sendMovies(movieData, email)
      .then((likedMovie) => {
        setSavedMoviesList([likedMovie.data, ...savedMoviesList].reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // удаление фильма из избранного
  const deleteMovie = (id) => {
    MainApi.deleteMovies(id)
      .then(() => {
        setSavedMoviesList((savedMovies) =>
          savedMovies.filter((c) => c._id !== id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

 
  const [loggedIn, setLoggedIn] = useState(true);

  const [registerError, setRegisterError] = useState(true);
  const [loginError, setLoginError] = useState(true);
  const [profileMessage, setProfileMessage] = useState(true);

 
  /**Получить токен*/
  function checkToken() {
    const token = localStorage.getItem('jwt');
    apiAuth.setToken(token);
    if (token) {
      apiAuth
        . getUserInfo()
        .then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
        })
        .catch((err) => {
          setLoggedIn(false);
          logOut();
          if (err === 'Ошибка: 401') {
            setLoginError(
              'При авторизации произошла ошибка. Токен не передан или передан не в том формате.'
            );
          }
          if (err === 'Ошибка: 403') {
            setLoginError(
              'При авторизации произошла ошибка. Переданный токен некорректен.'
            );
          }
        });
    } else {
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, [loggedIn]);

  /**Зарегистрировать пользователя*/
  function handleRegister(regData) {
    const email = regData.email;
    const password = regData.password;
    registerUser(regData)
      .then((res) => {
        handleLogin({ email, password });
        navigate('/movies');
      })
      .catch((err) => {
        setLoggedIn(false);
        if (err === 'Ошибка: 409') {
          setRegisterError('Пользователь с таким email уже существует');
        }
        if (err === 'Ошибка: 500') {
          setRegisterError('На сервере произошла ошибка');
        }
      });
  }

  /**Авторизация пользователя*/
  function handleLogin(loginData) {
      authorizeUser(loginData)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        navigate('/movies');
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
        if (err === 'Ошибка: 401') {
          setLoginError('Вы ввели неправильный логин или пароль');
        }
        if (err === 'Ошибка: 500') {
          setLoginError('На сервере произошла ошибка');
        }
      });
  }

    /**изменить данные пользователя*/
    function handleUpdateUser(userData) {
      updateUserInfo(userData)
        .then((newUser) => {
          setCurrentUser(newUser);
          setProfileMessage("Данные успешно обновлены");
        })
        .catch((err) => {
          if (err === "Ошибка: 409") {
            setProfileMessage("Пользователь с таким email уже существует");
          } else {
            setProfileMessage("При обновлении профиля произошла ошибка");
          }
        });
      
    }

  /**Выйти из аккаунта*/
  function logOut() {
    setToken(null);
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    navigate("/");
    console.log("Выход");
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route
            index
            path='/'
            element={<Main isLoggedIn={loggedIn} isLoading={isLoading} />}
          />

          <Route
            exact
            path='/profile'
            element={
              <ProtectedRoute
                logOut={logOut}
                updateUser={handleUpdateUser}
                isLoading={isLoading}
                tokenExist={checkToken}
                profileChanged={profileChanged}
                element={Profile}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                profileMessage={profileMessage}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            exact
            path='/movies'
            element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={loggedIn}
                isLoading={isLoading}
                tokenExist={checkToken}
                apiMoviesList={apiMoviesList}
                savedMoviesList={savedMoviesList}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                isSavedMoviesPage={isSavedMoviesPage}
                isMoviesPage={isMoviesPage}
              />
            }
          />

          <Route
            exact
            path='/saved-movies'
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={loggedIn}
                isLoading={isLoading}
                tokenExist={checkToken}
                savedMoviesList={savedMoviesList}
                deleteMovie={deleteMovie}
              />
            }
          />

<Route
            path="/signin"
            element={<Login 
              loginUser={handleLogin} 
            loginError={loginError} 
            isLoginPage={isLoginPage} />}
          />
          <Route
            path="/signup"
            element={
              <Register
              registerUser={handleRegister}
                registerError={registerError}
                isSignupPage={isSignupPage}
              />
            }
          />

          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;