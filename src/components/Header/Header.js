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








/*import  HeaderAuth  from "../HeaderAuth/HeaderAuth";
import  MobileMenu  from "../MobileMenu/MobileMenu";
import { useState } from "react";
import  Logo  from "../Logo/Logo";
import './Header.css'
import  HeaderNav  from "../HeaderNav/HeaderNav";

export const Header = ({ isLoggedIn, color }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <header className={`header ${color}`}>
        <div className='container'>
          <nav className='header__nav'>
            <Logo position={"header__logo"} />
            {!isLoggedIn ? (
              <HeaderAuth />
            ) : (
              <HeaderNav isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
          </nav>
        </div>
  
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </header>
    );
  };
export default Header;*/