import React from 'react';
import './AboutProject.css'
import  TitleBlock  from "../TitleBlock/TitleBlock";

function AboutProject() {
  return (
    <section className='project' id='project'>
      <div className='container'>
        <TitleBlock name='О проекте' margin='project__title' />
        <div className='project__content'>
          <div className='project__info'>
            <h3 className='project__plan'>Дипломный проект включал 5 этапов</h3>
            <p className='project__description'>
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className='project__info'>
            <h3 className='project__plan'>
              На выполнение диплома ушло 5 недель
            </h3>
            <p className='project__description'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>

        <div className='project__time'>
          <div className='project__top'>
            <div className='project__week project__week_small'>1 неделя</div>
            <div className='project__week'>4 недели</div>
          </div>

          <div className='project__bottom'>
            <div className='project__signature project__signature_small'>
              Back-end
            </div>
            <div className='project__signature'>Front-end</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutProject