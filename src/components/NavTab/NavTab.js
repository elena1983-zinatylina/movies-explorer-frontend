import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <section className="navtab">
      <nav className='navtab__links'>
        <ul className="navtab__list">
          <li className="navtab__list-item"><a href="#aboutproject" className="navtab__link link">О проекте</a></li>
          <li className="navtab__list-item"><a href="#techs" className="navtab__link link">Технологии</a></li>
          <li className="navtab__list-item"><a href="#aboutme" className="navtab__link link">Студент</a></li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;