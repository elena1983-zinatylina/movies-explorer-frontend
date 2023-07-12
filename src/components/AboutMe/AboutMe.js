import React from 'react';
import './AboutMe.css';
import avatar from '../../images/profile-foto.jpg';

function AboutMe() {
  return (
    <section className="aboutme" id="aboutme">
      <h2 className="aboutme__title section-title">Студент</h2>
      <div className="aboutme__profile">
        <div className="aboutme__discription">
          <h3 className="aboutme__name">Елена</h3>
          <p className="aboutme__job">Фронтенд-разработчик, 40 лет</p>
          <p className="aboutme__text">Я родилась живу в г.Краснодаре  закончила курс по веб-&nbsp;разработке 
          в Яндекс Практикуме.
          У меня есть супруг и две прекрасные дочери. 
          Я люблю учиться новому и никогда не останавливаюсь на достигнутом,
          а ещё увлекаюсь обработкой изображений в программе Фотошоп. Недавно начала кодить.</p>
          <a className="aboutme__link link" href="https://github.com/elena1983-zinatylina" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className="aboutme__avatar" src={avatar} alt="Аватар" />
      </div>
    </section>
  )
}

export default AboutMe;