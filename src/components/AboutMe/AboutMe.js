import React from 'react';
import './AboutMe.css';
import arrow from "../../images/стрелкавпортфолио.svg";
import photo from '../../images/profile-foto.jpg';
import TitleBlock  from "../TitleBlock/TitleBlock";

function AboutMe() {
  return (
    <section className='about-student' id='about-student'>
    <div className='container'>
      <TitleBlock name='Студент' margin='about-student__title' />
      <div className='about-student__wrapper'>
        <div className='about-student__box'>
          <h3 className='about-student__name'>Елена Зинатулина</h3>
          <p className='about-student__profession'>
            Фронтенд-разработчик, 40 лет </p>
          <p className='about-student__description'>Я родилась живу в г.Краснодаре  закончила курс по веб-&nbsp;разработке 
          в Яндекс Практикуме.
          У меня есть супруг и две прекрасные дочери. 
          Я люблю учиться новому и никогда не останавливаюсь на достигнутом,
          а ещё увлекаюсь обработкой изображений в программе Фотошоп. Недавно начала кодить и от появления до начала работы новой кнопки полный восторг.</p>
          <a
              className='about-student__link hover-link'
              rel='noreferrer'
              href="https://github.com/elena1983-zinatylina"
              target='_blank'
            >
              Github
            </a>
          </div>

          <img
            className='about-student__image'
            src={photo}
            alt='Фото студента'
          />
        </div>

        <span className='about-student__portfolio'>Портфолио</span>
        <ul className='about-student__items'>
          <li className='about-student__item'>
            <a
              className='about-student__item-link hover-link'
              rel='noreferrer'
              href="https://github.com/elena1983-zinatylina/how-to-learn"
              target='_blank'
            >
              Статичный сайт
              <img className='about-student__arrow' src={arrow} alt='Стрелка' />
            </a>
          </li>
          <li className='about-student__item'>
            <a
              className='about-student__item-link hover-link'
              rel='noreferrer'
              href="https://github.com/elena1983-zinatylina/russian-travel"
              target='_blank'
            >
              Адаптивный сайт
              <img className='about-student__arrow' src={arrow} alt='Стрелка' />
            </a>
          </li>
          <li className='about-student__item'>
            <a
              className='about-student__item-link hover-link'
              rel='noreferrer'
              href="https://zee.domainname.studen.nomoreparties.sbs/"
              target='_blank'
            >
              Одностраничное приложение
              <img className='about-student__arrow' src={arrow} alt='Стрелка' />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AboutMe;