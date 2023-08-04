import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ card }) {
  const location = useLocation();

  // длительность фильма
  const durationHours = card.duration >= 60 ? `${Math.floor(card.duration / 60)} ч ` : '';
  const durationMinut = card.duration === 60 ? '' : `${card.duration % 60} м`;
  const duration = durationHours + durationMinut;

  return (
    <li className='card'>
      <a href={card.trailerLink} className='card__link link' target="_blank" rel="noreferrer">
        <img className='card__img' alt={card.nameRU} src={card.thumbnail} />
      </a>
        <div className='card__content'>
        <h2 className='card__name'>{card.nameRU}</h2>
          {(location.pathname === '/movies') && <button className='card__btn card__btn__blank button' type='button'></button>}
          {(location.pathname === '/saved-movies') && <button className='card__btn card__btn_delete ' type='button'></button>}
        </div>
      <p className='card__duration'>{duration}</p>
    </li>
  );
}

export default MoviesCard;