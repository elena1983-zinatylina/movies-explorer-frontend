import React from 'react';
import './AboutProject.css'

function AboutProject() {
  return (
    <section className="aboutproject" id="aboutproject">
      <h2 className="aboutproject__title section-title">О проекте</h2>
      <div className="aboutproject__container">
        <div className="aboutproject__discription">
          <h3 className="aboutproject__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="aboutproject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="aboutproject__discription">
          <h3 className="aboutproject__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="aboutproject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="aboutproject__timecode">
        <div className="aboutproject__backend">
          <p className="aboutproject__timecode-title aboutproject__timecode-title_backend">1 неделя</p>
          <p className="aboutproject__timecode-text">Back-end</p>
        </div>
        <div className="aboutproject__frontend">
          <p className="aboutproject__timecode-title aboutproject__timecode-title_frontend">4 недели</p>
          <p className="aboutproject__timecode-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject