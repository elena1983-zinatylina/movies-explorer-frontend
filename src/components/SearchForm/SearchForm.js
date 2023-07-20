import React from 'react';
import './SearchForm.css';
import Find from "../../images/find.svg";
import Iconfind from "../../images/iconfind.svg";

function SearchForm() {
  return (
    <section className='seachform'>
      <form className='seachform__input-container'>
      <img className="seachform__blackbtn button"
                        src={Iconfind}
                        alt='знак поиск темный'></img>
        <input className='seachform__input' placeholder='Фильм' required></input>
        <img className="seachform__btn button"
                        src={Find}
                        alt='знак поиск'></img>
     <div className='seachform__checkbox-conteiner'>
        <input type='checkbox' className='seachform__checkbox' id='seachform__checkbox' value='yes'></input>
        <label className='seachform__label link' htmlFor='seachform__checkbox'>Короткометражки</label>
      </div> 
      </form>
      
    </section>
  );
}

export default SearchForm;