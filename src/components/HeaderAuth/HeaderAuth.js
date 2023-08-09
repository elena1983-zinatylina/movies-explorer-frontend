import { Link } from "react-router-dom";
import './HeaderAuth.css';

 const HeaderAuth = () => {
  return (
    <div className='header__links'>
      <Link className='header__link hover-link' to='/signup'>
        Регистрация
      </Link>
      <Link
        className='header__link header__link_button hover-link'
        to='/signin'
      >
        Войти
      </Link>
    </div>
  );
};

export default HeaderAuth;