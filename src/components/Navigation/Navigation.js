import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';


function Navigation({ loggedIn }) {

  const navigationClass = (`navigation ${loggedIn ? '' : 'navigation_logout'}`);

  const [isNavigationSidebar, setIsNavigationSidebar] = React.useState(false);

  function openNavigationSidebar() {
    setIsNavigationSidebar(true)
  }

  function closeNavigationSidebar() {
    setIsNavigationSidebar(false)
  }

  return (
    <nav className={navigationClass}>

      {loggedIn && <div className='navigation-menu'>
        <NavLink to='/movies' className={({ isActive }) => `navigation-menu__title link ${isActive ? 'navigation-menu__title_active' : ''}`}>Фильмы</NavLink>
        <NavLink to='/saved-movies' className={({ isActive }) => `navigation-menu__title link ${isActive ? 'navigation-menu__title_active' : ''}`}>Сохранённые фильмы</NavLink>
        <NavLink to='/profile' className='navigation-account'>
          <p className='navigation-account__link link'>Аккаунт</p>
          
        </NavLink>
      </div>}

      {!loggedIn && <div className='navigation-btns'>
        <NavLink to='/signup' className='navigation-btns__link'>
          <button className='navigation-btns__button navigation-btns__button_type_reg button' type='button'>Регистрация</button>
        </NavLink>
        <NavLink to='/signin' className='navigation-btns__link'>
          <button className='navigation-btns__button button' type='button'>Войти</button>    
        </NavLink>
      </div>}

      { <button className='navigation-burger button' type='button' onClick={openNavigationSidebar}></button>}

      { <aside className={`navigation-sidebar ${isNavigationSidebar ? 'navigation-sidebar_opened' : ''}`} >
        <div className='navigation-sidebar__content'>
          <ul className='navigation-sidebar__menu'>
            <li className='navigation-sidebar__title'><NavLink to='/' className={({ isActive }) => `navigation-sidebar__link link ${isActive ? 'navigation-sidebar__link_active' : ''}`}>Главная</NavLink></li>
            <li className='navigation-sidebar__title'><NavLink to='/movies' className={({ isActive }) => `navigation-sidebar__link link ${isActive ? 'navigation-sidebar__link_active' : ''}`}>Фильмы</NavLink></li>
            <li className='navigation-sidebar__title'><NavLink to='/saved-movies' className={({ isActive }) => `navigation-sidebar__link link ${isActive ? 'navigation-sidebar__link_active' : ''}`}>Сохранённые фильмы</NavLink></li>
          </ul>
          <NavLink to='/profile' className='navigation-account navigation-account_sidebar'>
           <p className='navigation-account__link link'>Аккаунт</p>
           
          </NavLink>
          <button className='navigation-btnclose button' type='button' onClick={closeNavigationSidebar}></button>
        </div>
      </aside>}

    </nav>
  );
}

export default Navigation;