import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import {
  register,
  authorize,
  getUserInfo,
  updateUserInfo,
  setToken,
} from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);

  const [registerError, setRegisterError] = useState(true);
  const [loginError, setLoginError] = useState(true);
  const [profileMessage, setProfileMessage] = useState(true);

  const navigate = useNavigate();

  /**получить токен*/
  function checkToken() {
    const token = localStorage.getItem("jwt");
    setToken(token);
    if (token) {
      getUserInfo()
        .then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
        })
        .catch((err) => {
          setLoggedIn(false);
          logOut();
          if (err === "Ошибка: 401") {
            setLoginError(
              "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
            );
          }
          if (err === "Ошибка: 403") {
            setLoginError(
              "При авторизации произошла ошибка. Переданный токен некорректен."
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

  /**зарегистрировать пользователя*/
  function handleRegister(regData) {
    const email = regData.email;
    const password = regData.password;
    register(regData)
      .then((res) => {
        handleLogin({ email, password });
        navigate("/movies");
      })
      .catch((err) => {
        setLoggedIn(false);
        if (err === "Ошибка: 409") {
          setRegisterError("Пользователь с таким email уже существует");
        }
        if (err === "Ошибка: 500") {
          setRegisterError("На сервере произошла ошибка");
        }
      });
  }

  /**авторизация пользователя*/
  function handleLogin(loginData) {
    authorize(loginData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        navigate("/movies");
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
        if (err === "Ошибка: 401") {
          setLoginError("Вы ввели неправильный логин или пароль");
        }
        if (err === "Ошибка: 500") {
          setLoginError("На сервере произошла ошибка");
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

  /**выйти из аккаунта*/
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
      <div className="app">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={<ProtectedRoute element={Movies} loggedIn={loggedIn} />}
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                logOut={logOut}
                profileMessage={profileMessage}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} 
            loginError={loginError}
            setLoginError={setLoginError}
             />}
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                registerError={registerError}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;