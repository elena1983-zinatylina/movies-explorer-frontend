import React, { useState, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';

function Profile({ loggedIn }) {

  const [initChange, setInitChange] = useState(false);

  function handleClickEditButton(event) {
    event.preventDefault();
    setInitChange(true);   
  }

  function handleSubmit(event){
    event.preventDefault();
    setInitChange(false);   
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className='profile'>
        <h1 className='profile__greetings'>Привет, Виталий!</h1>
        <form className='profile__form'>
          <fieldset className='profile__user'>
            <div className='profile__data'>
              <label className='profile__data-field'>Имя</label>
              <input
                id='profile__name'
                className='profile__input'
                type='text'
                name='name'
                placeholder='Ваше имя'
                required
                minLength='2'
                maxLength='30'
                defaultValue='Виталий'
                disabled={initChange ? false : true}
              />
            </div>
            <div className='profile__data'>
              <label className='profile__data-field'>E-mail</label>
              <input
                id='profile__email'
                className='profile__input'
                type='text'
                name='email'
                placeholder='Ваш email'
                defaultValue='pochta@yandex.ru'
                required
                disabled={initChange ? false : true}
              />
            </div>
          </fieldset>
          <div className='profile__btns'>
            {initChange ?
              <button className='profile__btn profile__btn_submit button' type='submit' onClick={handleSubmit}>Сохранить</button>
            :
              <>
              <button className='profile__btn profile__btn_edit button' type='button' onClick={handleClickEditButton}>Редактировать</button>
              <button className='profile__btn profile__btn_exit button' type='button'>Выйти из аккаунта</button>
              </>
            } 
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;