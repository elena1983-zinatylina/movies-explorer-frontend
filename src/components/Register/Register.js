import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../../images/logo.svg';

function Register({ onRegister, registerError, setRegisterError }) {
  /**Переменные состояния полей почты и пароля*/
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /**Переменные состояния ошибок при заполнении полей*/
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  /**Переменные валидности полей при заполнении*/
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  /**Переменная состояния статуса изменений*/
  const [messageStatus, setMessageStatus] = useState('');
  /**Переменная состония валидности формы*/
  const [formValid, setFormValid] = useState(false);

  /**Функция изменения имени пользователя и проверка формы*/
  const handleChangeName = (e) => {
    setName(e.target.value);
    setMessageStatus('');
    setRegisterError('');
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z -]+$/g;

    if (e.target.value.length === 0) {
      setNameError('Поле не может быть пустым');
      setNameValid(false);
    } else if (e.target.value.length < 2 || e.target.value.length > 30) {
      setNameError('Имя пользователя должно быть длинее 2 и меньше 30');
      setNameValid(false);
    } else if (!nameRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setNameError('Некорректное имя');
      setNameValid(false);
    } else {
      setNameError('');
      setNameValid(true);
    }
  };

  /**Функция изменения почты пользователя и проверка формы*/
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setMessageStatus('');
    setRegisterError('');
    const emailRegex = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (e.target.value.length === 0) {
      setEmailError('Поле не может быть пустым');
      setEmailValid(false);
    } else if (!emailRegex.test(String(e.target.value).toLocaleLowerCase())) {
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
    setRegisterError('');
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
    if (!nameValid || !emailValid || !passwordValid) {
      setFormValid(false);
      setMessageStatus('');
      return;
    }
    setFormValid(true);
  }

  /**Функция сохранения формы*/
  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ name, email, password });
  }

  /**Отслеживание состояния полей инпутов*/
  useEffect(() => {
    inputValid();
  }, [name, email, password]);


   return (
    <section className='authorization'>
      <Link className='authorization__link link' to='/'>
        <img className='authorization__logo' src={Logo} alt='Логотип'></img>
      </Link>
      <h1 className='authorization__title'>Добро пожаловать!</h1>
      <form
        className='authorization-form'
        action='#'
        name='authorization-form'
        onSubmit={handleSubmit}
      >
        <fieldset className='authorization-form__fieldset'>
          <div className='authorization-form__input-container'>
            <label
              className='authorization-form__label'
              htmlFor='authorization-form__input-name'
            >
              Имя
            </label>
            <input
              type='text'
              id='authorization-form__input-name'
              className='authorization-form__input'
              placeholder='Введите ваше имя'
              name='name'
              required
              minLength='2'
              maxLength='30'
              value={name}
              onChange={handleChangeName}
            />
            <span className='authorization-form__error'>{nameError}</span>
          </div>
          <div className='authorization-form__input-container'>
            <label
              className='authorization-form__label'
              htmlFor='authorization-form__input-email'
            >
              E-mail
            </label>
            <input
              type='email'
              id='authorization-form__input-email'
              className='authorization-form__input'
              placeholder='Введите ваш email'
              name='email'
              required
              minLength='5'
              maxLength='30'
              value={email}
              onChange={handleChangeEmail}
            />
            <span className='authorization-form__error'>{emailError}</span>
          </div>
          <div className='authorization-form__input-container'>
            <label
              className='authorization-form__label'
              htmlFor='authorization-form__input-password'
            >
              Пароль
            </label>
            <input
              type='password'
              id='authorization-form__input-password'
              className='authorization-form__input'
              placeholder='Введите пароль'
              name='password'
              required
              minLength='8'
              maxLength='30'
              value={password}
              onChange={handleChangePassword}
            />
            <span className='authorization-form__error'>{passwordError}</span>
          </div>
        </fieldset>
        <span className='authorization-form__error authorization-form__error_server'>
          {registerError}
        </span>
        <button
          className={`authorization-form__btn button ${
            !formValid ? 'authorization-form__btn_disabled' : ''
          }`}
          type='submit'
          disabled={!formValid}
        >
          Зарегистрироваться
        </button>
        <div className='authorization-form__question-container'>
          <p className='authorization-form__question'>Уже зарегистрированы?</p>
          <Link className='authorization-form__question-link link' to='/signin'>
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;