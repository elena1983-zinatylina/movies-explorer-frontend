import React from 'react';
import './SearchForm.css';
import Find from "../../images/find.svg";
import Iconfind from "../../images/iconfind.svg";
import Label from "../../images/input__COLOR_stroke-2.png";

function SearchForm() {
  return (
    <section className='seachform'>
      <div className='seachform__input-container'>
      <img className="seachform__blackbtn button"
                        src={Iconfind}
                        alt='знак поиск'></img>
        <input className='seachform__input' placeholder='Фильм' required></input>
        <img className="seachform__btn button"
                        src={Find}
                        alt='знак поиск'></img>
     <div className='seachform__checkbox-conteiner'>
        <input type='checkbox' className='seachform__checkbox' id='seachform__checkbox' value='yes'></input>
        <label className='seachform__label link' htmlFor='seachform__checkbox'>Короткометражки</label>
      </div> 
      </div>
      
    </section>
  );
}

export default SearchForm;