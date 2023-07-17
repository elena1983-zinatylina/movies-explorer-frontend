import React from 'react';
import Logo from "../../images/logo.svg";
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    return (
        <section className='login'> <Link className="login__link link" to="/">
        <img className="login__logo"
            src={Logo}
            alt='Логотип'></img>
    </Link>
            <h1 className='login__title'>Рады видеть!</h1>
            <form className="login-form"
                action="#"
                name="login-form"
                noValidate>
                <fieldset className='login-form__fieldset'>
                    <div className='login-form__input-container'>
                        <label className='login-form__label'
                            htmlFor='login-form__input-email'>
                            E-mail
                        </label>
                        <input type="email" id="login-form__input-email"
                            className="login-form__input"
                            placeholder='Введите email'
                            name="email"
                            required minLength="5"
                            maxLength="30" />
                    </div>
                    <div className='login-form__input-container'>
                        <label className='login-form__label' htmlFor='login-form__input-password'>Пароль</label>
                        <input type="password"
                            id="login-form__input-password"
                            className="login-form__input"
                            placeholder='Введите пароль'
                            name="password"
                            required minLength="6"
                            maxLength="30" />
                    </div>
                </fieldset>
                <span className="login-form__error"></span>
                <button className='login-form__button button'
                    type='submit'>
                    Войти
                </button>
                <div className='login-form__question-container'>
                    <p className='login-form__question'>
                        Ещё не зарегистрированы?
                    </p>
                    <Link className="login-form__question-link link"
                        to="/signup">
                        Регистрация
                    </Link>
                </div>
               
            </form>
        </section>
    );
}

export default Login;