import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ isMovies }) => {
   return (
      <section className='cards'>
         <div className='cards__container'>
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
         </div>
         <div className='cards__button-container'>
            <button className={isMovies ? 'cards__button' : 'cards__button_hidden'} type='button'>Ещё</button>
         </div>
      </section>
   )
}

export default MoviesCardList;