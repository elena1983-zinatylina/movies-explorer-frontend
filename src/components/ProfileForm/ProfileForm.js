import { useContext, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './ProfileForm.css'

export default function ProfileForm  ({
  logOut,
  updateUser,
  errorMessage,
  profileChanged,
})  {
  const currentUser = useContext(CurrentUserContext);
  const [nameDisabled, setNameDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [buttonSubmitForm, setButtonSubmitForm] = useState(false);
  const [buttonEditForm, setButtonEditForm] = useState(true);
  const [buttonLogout, setbuttonLogout] = useState(true);

  const { form, handleChange, errors, isValid } = useForm({
    name: currentUser.name,
    email: currentUser.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(form);
  };

  const handleEdit = () => {
    setButtonSubmitForm(true);
    setNameDisabled(false);
    setEmailDisabled(false);
    setButtonEditForm(false);
    setbuttonLogout(false);
  };

  return (
    <section className="profile">
      <h1 className="profile__greeting">{`Привет, ${currentUser.name}!`}</h1>

      <form className="profile__form" action="#" onSubmit={handleSubmit}>
        <label className="profile__label" htmlFor="input-name">
          Имя
          <input
            className="profile__input"
            type="text"
            name="name"
            id="input-name"
            placeholder="Имя"
            minLength="2"
            maxLength="20"
            disabled={nameDisabled}
            value={form.name || ""}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="profile__input-error input-error">
              {errors.name}
            </span>
          )}
        </label>

        <label className="profile__label" htmlFor="input-email">
          E-mail
          <input
            className="profile__input"
            type="email"
            name="email"
            id="input-email"
            placeholder="Почта"
            value={form.email || ""}
            minLength="5"
            maxLength="30"
            disabled={emailDisabled}
            onChange={handleChange}
            pattern="([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+"
          />
          {errors.email && (
            <span className="profile__input-error input-error ">
              {errors.email}
            </span>
          )}
        </label>

        {profileChanged && (
          <div className="profile__message">Данные успешно изменены!</div>
        )}

        <button
          className={`profile__edit ${
            !buttonEditForm ? "profile__edit_hidden" : ""
          } hover-link`}
          type="button"
          onClick={handleEdit}
        >
          {" "}
          Редактировать
        </button>

        {errorMessage !== "" ? (
          <p className="profile__error">{errorMessage}</p>
        ) : (
          ""
        )}

        <button
          className={`profile__submit ${
            !isValid ? "profile__submit_disabled" : ""
          } ${!buttonSubmitForm ? "profile__submit_hidden" : ""} hover-link`}
          disabled={!isValid}
          type="submit"
        >
          Сохранить
        </button>
      </form>

      <button
        className={`profile__logout ${
          !buttonLogout ? "profile__logout_hidden" : ""
        } hover-link `}
        onClick={logOut}
      >
        Выйти из аккаунта
      </button>
    </section>
  );
};