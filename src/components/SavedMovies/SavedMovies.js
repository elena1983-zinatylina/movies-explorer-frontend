import React from "react";
import  Header  from "../Header/Header";
import  Main  from "../Main/Main";
import  SearchForm  from "../SearchForm/SearchForm";
import  MoviesCardList  from "../MoviesCardList/MoviesCardList";
import  Footer  from "../Footer/Footer";
import { useState, useEffect } from "react";

export default function SavedMovies  ({ isLoggedIn, savedMoviesList, deleteMovie })  {
  const [likedMovies, setLikedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unsuccessfulSearch, setUnsuccessfulSearch] = useState("");
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    setLikedMovies(savedMoviesList);
  }, [savedMoviesList]);

  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const filterSavedMovies = async (inputValue, checkbox) => {
    setLoading(true);
    await timeout(1500);

    try {
      if (checkbox) {
        const movies = await savedMoviesList.filter((movie) => {
          return (
            (movie.nameRU.toLowerCase().includes(inputValue) ||
              movie.nameEN.toLowerCase().includes(inputValue)) &&
            movie.duration <= 40
          );
        });

        if (movies.length === 0) {
          setUnsuccessfulSearch("Ничего не найдено");
        } else {
          setUnsuccessfulSearch("");
        }

        setLikedMovies(movies);
      } else {
        const movies = await savedMoviesList.filter((movie) => {
          return (
            movie.nameRU.toLowerCase().includes(inputValue) ||
            movie.nameEN.toLowerCase().includes(inputValue)
          );
        });

        setLikedMovies(movies);
      }
    } catch (err) {
      console.log(err);
      setSearchError(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );
    }

    setLoading(false);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} color={"header_main"} />
      <Main>
        <SearchForm filterSavedMovies={filterSavedMovies} />
        <MoviesCardList
          movies={likedMovies}
          deleteMovie={deleteMovie}
          loading={loading}
          unsuccessfulSearch={unsuccessfulSearch}
          searchError={searchError}
        />
      </Main>
      <Footer />
    </>
  );
};