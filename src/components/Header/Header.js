import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const headerClass = (`header ${loggedIn ? 'header_movie' : 'header_main'}`);

  return (
    <header className={headerClass}>
      <Link to="/" className="header__link header__link_logo link">{<img className="header__logo" src={logo} alt="Логотип" /> }</Link>
      <Navigation loggedIn={loggedIn}/>
    </header>
  );
}
export default Header;