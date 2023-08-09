import MainForm  from "../MainForm/MainForm";
import { useForm } from "../../hooks/useForm";
import './Login.css';

export default function Login ({ loginUser, errorMessage })  {
  const { form, handleChange, errors, isValid } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    loginUser(email, password);
  };
  return (
    <MainForm
      title='Рады видеть!'
      nameForm='login'
      nameButton='Войти'
      submit={handleSubmit}
      isValid={isValid}
      errorMessage={errorMessage}
    >
      <label className='main-form__label' htmlFor='email'>
        E-mail{" "}
        <input
          className={`main-form__input ${
            errors.email ? "main-form__input_error" : ""
          }`}
          name='email'
          type='email'
          id='email'
          placeholder='Почта'
          minLength='5'
          maxLength='30'
          value={form.email || ""}
          onChange={handleChange}
          pattern='([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+'
          required
        />
        {errors.email && (
          <span className='main-form__input-error input-error'>
            {errors.email}
          </span>
        )}
      </label>
      <label className='main-form__label' htmlFor='password'>
        Пароль
        <input
          className={`main-form__input ${
            errors.password ? "main-form__input_error" : ""
          }`}
          name='password'
          type='password'
          id='password'
          placeholder='Пароль'
          minLength='4'
          maxLength='12'
          value={form.password || ""}
          onChange={handleChange}
          required
        />
        <span className='main-form__input-error input-error'>
          {errors.password}
        </span>
      </label>
    </MainForm>
  );
};