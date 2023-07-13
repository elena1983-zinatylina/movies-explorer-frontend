import React from 'react';
import './Promo.css';
import promo from '../../images/landing-logo.svg';

const Promo = () => {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
      <img className='promo__img' src={promo} alt='Логотип Промо.' />
      </div>
    </section>
  )
};

export default Promo;