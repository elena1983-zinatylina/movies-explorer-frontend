import React from "react";
import  BurgerMenu  from "../BurgerMenu/BurgerMenu";
import { NavLink } from "react-router-dom";
import './MobileMenu.css';

export const MobileMenu = ({ isOpen, setIsOpen }) => {
  const closeMenu = () => {
    return (isOpen = false);
  };

  return (
    <div className={`header__menu ${isOpen ? "header__menu_active" : ""}`}>
      <BurgerMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        position={"header__menu-burger"}
      />
      <div className='header__menu-wrapper'>
        <ul className='header__menu-list'>
          <li className='header__menu-item'>
            <NavLink className='header__menu-link hover-link' to='/'>
              Главная
            </NavLink>
          </li>

          <li className='header__menu-item'>
            <NavLink className='header__menu-link hover-link' to='/movies'>
              Фильмы
            </NavLink>
          </li>

          <li className='header__menu-item'>
            <NavLink
              className='header__menu-link hover-link'
              to='/saved-movies'
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;