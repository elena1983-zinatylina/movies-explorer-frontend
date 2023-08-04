import React, { useState, useRef, useEffect } from "react";
import './SearchForm.css';
import Find from "../../images/find.svg";
import Iconfind from "../../images/iconfind.svg";

function SearchForm(props) {
  const { filterCards, page } = props;

  // Переменная состояния кнопки поиска - активна/ не активна
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  // Переменная состояния ошибки
  const [error, setError] = useState({ name: "", isShortsMovie: "" });
  // Переменная состония поля input поиска
  const [value, setValue] = useState({ name: "", isShortsMovie: false });

  const formRef = useRef(null);

  // Эффект отслеживания состояния поля input поиска
  useEffect(() => {
    const searchMovies = JSON.parse(localStorage.getItem("search-movies"));
    if (searchMovies) {
      setValue(searchMovies);
      filterCards(searchMovies);
    }
    if (page === "saved-movies") {
      filterCards({ name: "", isShortsMovie: false });
      setValue({ name: "", isShortsMovie: false });
    }
  }, []);

  // Функция изменения input поиска
  const handleChange = (e) => {
    const { name, value: inputValue, validationMessage } = e.target;

    const updatedValue = { ...value, [name]: inputValue };
    if (page === "movies") {
      localStorage.setItem("search-movies", JSON.stringify(updatedValue));
    }
    setValue(updatedValue);
    setError((state) => ({ ...state, [name]: validationMessage }));
    setIsDisabledButton(!formRef.current.checkValidity());
  };

  // Функция отработки чекбокса
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    const updatedValue = { ...value, [name]: checked };

    if (page === "movies") {
      localStorage.setItem("search-movies", JSON.stringify(updatedValue));
    }
    setValue(updatedValue);
    filterCards(updatedValue);
  };

  // Функция отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    filterCards(value);
  };
  return (
    <section className='seachform'
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
      >
      <form className='seachform__input-container'>
      <img className="seachform__blackbtn button"
                        src={Iconfind}
                        alt='знак поиск темный'
                        type="submit"
                        onClick={handleSubmit}>
                        </img>
        <input className="seachform__input"
          placeholder="Фильм"
          required
          onChange={handleChange}
          value={value.name}
          name="name"
        ></input>
        <img className="seachform__btn button"
                        src={Find}
                        alt='знак поиск' 
                        type="submit"
                        onClick={handleSubmit}>
                        </img>
                        <span className="searchform__span"> {error.name}</span>
     <div className='seachform__checkbox-conteiner'>
        <input type='checkbox' className='seachform__checkbox' 
        id='seachform__checkbox' value='yes' onChange={handleCheckbox}
        checked={value.isShortsMovie}
      ></input>
        <label className='seachform__label link' 
        htmlFor='seachform__checkbox'>Короткометражки</label>
      </div> 
      </form>
    </section>
  );
}

export default SearchForm;