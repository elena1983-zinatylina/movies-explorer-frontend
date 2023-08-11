import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { getAllMovies } from "../../utils/MoviesApi";
import { getAllFilms, setToken } from "../../utils/MainApi";
import { DISPLAY_SETTINGS, SHORT_MOVIE_DURATION } from "../../utils/constants";


const moviesDisplay = () => {
  const display = { ...DISPLAY_SETTINGS.default };
  if (window.innerWidth < 990) {
    display.start = DISPLAY_SETTINGS.pad.start;
    display.load = DISPLAY_SETTINGS.pad.load;
  }
  if (window.innerWidth < 767) {
    display.start = DISPLAY_SETTINGS.mobile.start;
    display.load = DISPLAY_SETTINGS.mobile.load;
  }
  return display;
};

function Movies({ loggedIn }) {
  const display = moviesDisplay();
  const [statusPreloader, setStatusPreloader] = useState(false);

  /**переменные состояния фильмов*/
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState(display.start);

  /**переменная поиска*/
  const [searchRequest, setSearchRequest] = useState(false);

  /**обновить локальное хранилище при изменении состояния movies*/
  useEffect(() => {
    localStorage.setItem("local-movies", JSON.stringify(movies));
  }, [movies]);

  /**загрузить фильмы */
  const uploadMovies = () => {
    const display = moviesDisplay();
    setDisplayedMovies(displayedMovies + display.load);
  };

  /**фильтр фильмов*/
  const filterMovies = (search) => {
    setSearchRequest(true);

    /**фильтр фильмов по названию и продолжительности*/
    const filter = (movies) => {
      setFilteredMovies(
        movies.filter((movie) => {
          const movieTitle = movie.nameRU
            .toLowerCase()
            .includes(search.name.toLowerCase());
          const shortMovie = search.shortMovie
            ? movie.duration <= SHORT_MOVIE_DURATION
            : true;
          return movieTitle && shortMovie;
        })
      );
    };
    if (movies.length === 0) {
      const localMovies = JSON.parse(
        localStorage.getItem("local-movies") || "[]"
      );

      if (localMovies.length === 0) {
        console.log("localMovies.length", JSON.stringify(localMovies));

        const token = localStorage.getItem("jwt");
        setToken(token);
        setStatusPreloader(true);
        Promise.all([getAllMovies(), getAllFilms()]).then(
          ([beatFilms, localFilms]) => {
            console.log("beatFilms после promise:", beatFilms, localFilms);

            const blendedFilms = beatFilms.map((movie) => {
              const localMovie = localFilms.find(
                (localMovie) => localMovie.movieId === movie.id
              );

              console.log("localMovie", localMovie);

              /**задать единое название для всех фильмов*/
              movie._id = localMovie !== undefined ? localMovie._id : "";
              movie.movieId = movie.id;
              movie.thumbnail = `https://api.nomoreparties.co/${movie.image.url}`;
              movie.saved = localMovie !== undefined;
              return movie;
            });
            console.log("movie ID", blendedFilms);
            setMovies(blendedFilms);

            filter(blendedFilms);

            /**сохранить отредактированный список фильмов в локальное хранилище*/
            localStorage.setItem("local-movies", JSON.stringify(blendedFilms));
            /**сохранить список сохраненных фильмов в локальное хранилище*/
            localStorage.setItem(
              "saved-movies",
              JSON.stringify(blendedFilms.filter((movie) => movie.saved))
            );

            console.log("blendedFilms", blendedFilms);
            setStatusPreloader(false);
          }
        );
      } else {
        setMovies(localMovies);
        filter(localMovies);
        console.log("localMovies", localMovies);
      }
    } else {
      filter(movies);
      setDisplayedMovies(display.start);
      console.log("setDisplayedMovies", movies);
    }
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm filterMovies={filterMovies} page="movies" />
        <MoviesCardList
          movies={filteredMovies.filter((_, i) => i < displayedMovies)}
          searchRequest={searchRequest}
          statusPreloader={statusPreloader}
        />
        {(filteredMovies.length > displayedMovies) &&
          <button
            className="movies__add-cards button"
            type="button"
            onClick={uploadMovies}
          >
            Ещё
          </button>
        }
      </main>
      <Footer />
    </>
  );
};

export default Movies;