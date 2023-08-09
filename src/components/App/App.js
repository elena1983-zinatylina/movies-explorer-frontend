import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import * as apiAuth from "../../utils/apiAuth";
import  Landing  from "../Landing/Landing";
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
import ProtectedRouteForLoggedIn from "../ProtectedRouteForLoggedIn/ProtectedRouteForLoggedIn";

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
        apiAuth.getUserData(jwt),
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

  //регистрация
  const registerUser = (name, password, email) => {
    apiAuth.registerUser(name, password, email)
      .then((res) => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          setErrorMessage("Произошла ошибка, попрбуйте еще раз...");
        }
      });
  };

  //войти в приложение
  const loginUser = (email, password) => {
    apiAuth.authorizeUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setTokenExist(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          setErrorMessage("Произошла ошибка авторизации, попрбуйте еще раз...");
        }
      });
  };

  //выйти из приложения
  const logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("foundMovies");
    localStorage.removeItem("inputValue");
    localStorage.removeItem("checkboxValue");
    setIsLoggedIn(false);
    navigate("/");
  };

  //обновить данные пользователя
  const updateUser = (form) => {
    setIsLoading(true);
    MainApi.sendUser(form)
      .then((resp) => {
        setCurrentUser(resp);
        setProfileChanged(true);
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          setErrorMessage("При обновлении профиля произошла ошибка.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //скрываем уведомление о смене данных пользователя
  useEffect(() => {
    setProfileChanged(false);
  }, [isProfilePage]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route
            index
            path='/'
            element={<Landing isLoggedIn={isLoggedIn} isLoading={isLoading} />}
          />

          <Route
            exact
            path='/profile'
            element={
              <ProtectedRoute
                element={Profile}
                logOut={logOut}
                updateUser={updateUser}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                tokenExist={tokenExist}
                profileChanged={profileChanged}
              />
            }
          />

          <Route
            exact
            path='/movies'
            element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                tokenExist={tokenExist}
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
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                tokenExist={tokenExist}
                savedMoviesList={savedMoviesList}
                deleteMovie={deleteMovie}
              />
            }
          />

          <Route
            exact
            path='/signup'
            element={
              <ProtectedRouteForLoggedIn
                element={Register}
                registerUser={registerUser}
                errorMessage={errorMessage}
                isSignupPage={isSignupPage}
                tokenExist={tokenExist}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          <Route
            exact
            path='/signin'
            element={
              <ProtectedRouteForLoggedIn
                element={Login}
                loginUser={loginUser}
                errorMessage={errorMessage}
                isLoginPage={isLoginPage}
                tokenExist={tokenExist}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          <Route exact path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;