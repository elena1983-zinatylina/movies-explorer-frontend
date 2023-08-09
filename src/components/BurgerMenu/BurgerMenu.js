import './BurgerMenu.css';

const BurgerMenu = ({ isOpen, setIsOpen, position }) => {
    return (
      <button
        className={`burger ${isOpen && "burger_active"} ${position}`}
        onClick={() => setIsOpen(!isOpen)}
        type='button'
        aria-label='Открыть главное меню'
      >
        <span className='burger__line'></span>
      </button>
    );
  };

  export default BurgerMenu;