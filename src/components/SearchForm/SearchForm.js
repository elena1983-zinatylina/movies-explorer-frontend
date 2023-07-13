import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='seachform'>
      <div className='seachform__input-container'>
        <input className='seachform__input' placeholder='Фильм' required></input>
        <button className='seachform__btn button' type='submit'>Найти</button>
      </div>
      <div className='seachform__checkbox-conteiner'>
        <input type='checkbox' className='seachform__checkbox' id='seachform__checkbox' value='yes'></input>
        <label className='seachform__label link' htmlFor='seachform__checkbox'>Короткометражки</label>
      </div>
    </section>
  );
}

export default SearchForm;