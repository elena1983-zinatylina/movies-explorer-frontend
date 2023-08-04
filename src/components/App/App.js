import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import mainApi from '../../utils/MainApi';
import * as apiAuth from '../../utils/apiAuth';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);

  const [registerError, setRegisterError] = useState(true);
  const [loginError, setLoginError] = useState(true);
  const [profileMessage, setProfileMessage] = useState(true);

  const navigate = useNavigate();

   /**Получить токен*/
   function checkToken() {
    const token = localStorage.getItem('jwt');
    mainApi.setToken(token);
    if (token) {
      mainApi
        .getUserInfo()
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
    apiAuth
      .register(regData)
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
    apiAuth
      .login(loginData)
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

  /**Выйти из аккаунта*/
  function logOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/');
    mainApi.setToken('');
    console.log('Выход');
  }

  /**Изменить данные пользователя*/
  function handleUpdateUser(userData) {
    mainApi
      .updateUserInfo(userData)
      .then((newUser) => {
        setCurrentUser(newUser);
        setProfileMessage('Данные успешно обновлены');
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setProfileMessage('Пользователь с таким email уже существует');
        } else {
          setProfileMessage('При обновлении профиля произошла ошибка');
        }
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="app">
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route path="/movies" 
           element={<ProtectedRoute element={Movies} loggedIn={loggedIn} />}
        />
        <Route path="/saved-movies" 
         element={
          <ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />
        }
      />
        <Route path="/profile"  element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                logOut={logOut}
                profileMessage={profileMessage}
              />
            } />
        <Route path="/signin"   element={<Login onLogin={handleLogin} loginError={loginError} />}
          />
        <Route path="/signup"  element={
              <Register
                onRegister={handleRegister}
                registerError={registerError}
              />
            }
          />
        <Route path="*"element={<NotFound />} />
        </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;