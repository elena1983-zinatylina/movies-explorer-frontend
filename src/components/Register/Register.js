import React from 'react';
import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
  return (
    <section className='authorization'>
      <Link className='authorization__link link' to='/'>
          <img className='authorization__logo' src={Logo} alt='Логотип'></img>
      </Link>
      <h1 className='authorization__title'>Добро пожаловать!</h1>
      <form className='authorization-form' action='#' name='authorization-form' noValidate>
          <fieldset className='authorization-form__fieldset'>
              <div className='authorization-form__input-container'>
                  <label className='authorization-form__label' htmlFor='authorization-form__input-name'>Имя</label>
                  <input type='text' id='authorization-form__input-name' className='authorization-form__input' placeholder='Введите ваше имя' name='name' required minLength='2' maxLength='30' />
              </div>
              <div className='authorization-form__input-container'>
                  <label className='authorization-form__label' htmlFor='authorization-form__input-email'>E-mail</label>
                  <input type='email' id='authorization-form__input-email' className='authorization-form__input' placeholder='Введите ваш email' name='email' required minLength='5' maxLength='30' />
              </div>
              <div className='authorization-form__input-container'>
                  <label className='authorization-form__label' htmlFor='authorization-form__input-password'>Пароль</label>
                  <input type='password' id='authorization-form__input-password' className='authorization-form__input' placeholder='Введите пароль' name='password' required minLength='8' maxLength='30' />
              </div>
          </fieldset>
          <span className='authorization-form__error'>Что-то пошло не так...</span>
          <button className='authorization-form__button button' type='submit'>Зарегистрироваться</button>
          <div className='authorization-form__question-container'>
              <p className='authorization-form__question'>Уже зарегистрированы?</p>
              <Link className='authorization-form__question-link link' to='/signin'>Войти</Link>
          </div>
      </form>
    </section>
  );
}

export default Register;