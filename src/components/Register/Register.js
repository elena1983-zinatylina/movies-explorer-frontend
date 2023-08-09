import  MainForm  from "../MainForm/MainForm";
import { useForm } from "../../hooks/useForm";

export const Register = ({ registerUser, errorMessage }) => {
  const { form, errors, isValid, handleChange } = useForm({
    name: "",
    password: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    registerUser(name, email, password);
  };

  return (
    <MainForm
      title='Добро пожаловать!'
      nameForm='register'
      nameButton='Зарегистрироваться'
      submit={handleSubmit}
      isValid={isValid}
      errorMessage={errorMessage}
    >
      <label className='main-form__label' htmlFor='name'>
        Имя
        <input
          className={`main-form__input ${
            errors.name ? "main-form__input_error" : ""
          }`}
          name='name'
          id='name'
          type='text'
          placeholder='Имя'
          value={form.name || ""}
          minLength='2'
          maxLength='20'
          onChange={handleChange}
          required
        />
        {errors.name && (
          <span className='main-form__input-error'>{errors.name}</span>
        )}
      </label>
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
        {errors.password && (
          <span className='main-form__input-error input-error'>
            {errors.password}
          </span>
        )}
      </label>
    </MainForm>
  );
};
export default Register;