import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "./MoviesCard.css";

export default function MoviesCard  ({
  movie,
  savedMoviesList,
  saveMovie,
  deleteMovie,
})  {
  const currentUser = useContext(CurrentUserContext);
  const [savedMovie, setSavedMovie] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const isSavedMoviesPage = window.location.pathname === "/saved-movies";

  //проверка наличия сохраненных фильмов
  useEffect(() => {
    if (savedMoviesList) {
      savedMoviesList.forEach((savedMovie) => {
        if (savedMovie.movieId === movie.id) {
          setIsLiked(true);
          setSavedMovie(savedMovie._id);
        }
      });
    }
  }, [savedMoviesList]);

  const handleSaveOrDeleteMovie = () => {
    if (isSavedMoviesPage) {
      deleteMovie(movie._id);
    } else {
      if (!isLiked) {
        saveMovie(movie, currentUser.email);
        setIsLiked(true);
      } else {
        deleteMovie(savedMovie);
        setIsLiked(false);
      }
    }
  };

  const timeЕranslation = () => {
    const totalMinutes = movie.duration;
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours}ч ${minutes !== 0 ? minutes + "м" : ""}`;
  };

  return (
    <li className='movies-cards__item'>
      <div className='movies-cards__head'>
        <div className='movies-cards__info'>
          <h3 className='movies-cards__title'>{movie.nameRU}</h3>
          <p className='movies-cards__duration'>
            {movie.duration > 60 ? timeЕranslation() : `${movie.duration} мин`}
          </p>
        </div>
        <button
          className={`movies-cards__favourite ${
            isLiked ? "movies-cards__favourite_active" : ""
          } ${
            isSavedMoviesPage ? "movies-cards__favourite_saved" : ""
          }  hover-link`}
          aria-label='Добавить фильм в избранное'
          onClick={handleSaveOrDeleteMovie}
        ></button>
      </div>
      <a
        className='movies-cards__link hover-link'
        target='_blank'
        rel='noreferrer'
        href={movie.trailerLink}
      >
        <img
          className='movies-cards__image'
          src={
            isSavedMoviesPage
              ? movie.image
              : `https://api.nomoreparties.co${movie.image.url}`
          }
          alt='Изображение фильма'
        />
      </a>
    </li>
  );
};