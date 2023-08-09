import { NavLink } from "react-router-dom";
import  BurgerMenu  from "../BurgerMenu/BurgerMenu";
import  ProfileButton  from "../ProfileButton/ProfileButton";
import './HeaderNav.css';

export default function HeaderNav ({ isOpen, setIsOpen })  {
  return (
    <>
      <nav className='header__movie-links'>
        <NavLink className='header__movie-link hover-link' to='/movies'>
          Фильмы
        </NavLink>
        <NavLink className='header__movie-link hover-link' to='/saved-movies'>
          Сохранённые фильмы
        </NavLink>
      </nav>
      <ProfileButton />
      <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};