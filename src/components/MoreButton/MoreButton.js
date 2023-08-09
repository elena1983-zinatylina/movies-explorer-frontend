import './MoreButton.css';

export default function MoreButton  ({ showMore })  {
    return (
      <button
        className="movies-cards__more hover-link"
        aria-label="Добавить больше фильмов на страницу"
        onClick={showMore}
      >
        Ещё
      </button>
    );
  };