import  HeaderAuth  from "../HeaderAuth/HeaderAuth";
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
export default Header;