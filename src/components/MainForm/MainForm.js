import { Link } from "react-router-dom";
import  Logo  from "../Logo/Logo";
import './MainForm.css';

export default function MainForm  ({
  title,
  nameForm,
  nameButton,
  submit,
  isValid,
  children,
  errorMessage,
})  {
  return (
    <section className='main-form'>
      <div className='container'>
        <div className='main-form__wrapper'>
          <Logo position={"main-form__logo"} />
          <h1 className='main-form__title'>{title}</h1>

          <form className='main-form__form' name={nameForm} onSubmit={submit}>
            {children}
            <p className='main-form__error'>{errorMessage}</p>
            <button
              className={`main-form__submit ${
                !isValid ? "main-form__submit_disabled" : ""
              } hover-link`}
              disabled={!isValid}
              type='submit'
            >
              {nameButton}
            </button>

            {nameForm === "register" && (
              <p className='main-form__answer'>
                Уже зарегистрированы?{" "}
                <Link className='main-form__sign hover-link' to='/signin'>
                  Войти
                </Link>
              </p>
            )}

            {nameForm === "login" && (
              <p className='main-form__answer'>
                Ещё не зарегистрированы?{" "}
                <Link className='main-form__sign hover-link' to='/signup'>
                  Регистрация
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};