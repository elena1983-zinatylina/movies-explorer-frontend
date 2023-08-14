import React from "react";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, searchRequest,  handleSavedMovie,
  statusPreloader }) {
  return (
    <section className="moviescardlist">
      {statusPreloader ? (
        <Preloader />
      ) : (
        <ul className="moviescardlist__list">
          {movies?.map((movie) => (
            <MoviesCard key={movie.movieId} movie={movie}  handleSavedMovie={handleSavedMovie}/>
            ))}
            {movies.length === 0 && searchRequest && !statusPreloader && (
              <li>
                <p className="moviescardlist__text">Ничего не найдено</p>
              </li>
            )}
          </ul>
      )}
    </section>
  );
}

export default MoviesCardList