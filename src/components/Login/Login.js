import React, { useState, useEffect } from 'react';
import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Login.css';
import { authorizeUser } from '../../utils/apiAuth';

function Login({ loginUser, loginError }) {
  /**Переменные состояния полей почты и пароля*/
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /**Переменные состояния ошибок при заполнении полей*/
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  /**Переменные валидности полей при заполнении*/
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  /**Переменная состояния статуса изменений*/
  const [messageStatus, setMessageStatus] = useState('');
  /**Переменная состония валидности формы*/
  const [formValid, setFormValid] = useState(false);

  /**Функция изменения имени пользователя и проверка формы*/
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setMessageStatus('');
    const re = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (e.target.value.length === 0) {
      setEmailError('Поле не может быть пустым');
      setEmailValid(false);
    } else if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Некорректный email');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  }

  /**Функция изменения пароля пользователя и проверка формы*/
  function handleChangePassword(e) {
    setPassword(e.target.value);
    setMessageStatus('');

    if (!e.target.value) {
      setPasswordError('Поле не может быть пустым');
      setPasswordValid(false);
    } else if (e.target.value.length <= 7) {
      setPasswordError(
        'Длина пароля не может быть меньше 8 и больше 30 символов'
      );
      setPasswordValid(false);
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }
  }

  /**Функция проверки валидности полей*/
  function inputValid() {
    if (!emailValid || !passwordValid) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
  }

  /**Функция сохранения формы*/
  function handleSubmit(e) {
    e.preventDefault();
    loginUser({ email, password });
  }

  /**Отслеживание состояния полей инпутов*/
  useEffect(() => {
    inputValid();
  }, [email, password]);

  return (
    <section className='login'>
      <Link className='login__link link' to='/'>
        <img className='login__logo' src={Logo} alt='Логотип'></img>
      </Link>
      <h1 className='login__title'>Рады видеть!</h1>
      <form
        className='login-form'
        action='#'
        name='login-form'
        onSubmit={handleSubmit}
      >
        <fieldset className='login-form__fieldset'>
          <div className='login-form__input-container'>
            <label
              className='login-form__label'
              htmlFor='login-form__input-email'
            >
              E-mail
            </label>
            <input
              type='email'
              id='login-form__input-email'
              className='login-form__input'
              placeholder='Введите email'
              name='email'
              required
              minLength='5'
              maxLength='30'
              value={email}
              onChange={handleChangeEmail}
            />
            <span className='login-form__error'>{emailError}</span>
          </div>
          <div className='login-form__input-container'>
            <label
              className='login-form__label'
              htmlFor='login-form__input-password'
            >
              Пароль
            </label>
            <input
              type='password'
              id='login-form__input-password'
              className='login-form__input'
              placeholder='Введите пароль'
              name='password'
              required
              minLength='6'
              maxLength='30'
              value={password}
              onChange={handleChangePassword}
            />
            <span className='login-form__error'>{passwordError}</span>
          </div>
        </fieldset>
        <span className='login-form__error login-form__error_server'>
          {loginError}
        </span>
        <button
          className={`login-form__button button ${
            !formValid ? 'login-form__button_disabled' : ''
          }`}
          type='submit'
          disabled={!formValid}
        >
          Войти
        </button>
        <div className='login-form__question-container'>
          <p className='login-form__question'>Ещё не зарегистрированы?</p>
          <Link className='login-form__question-link link' to='/signup'>
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;