import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__subtitle">Страница не найдена</p>
      <button type="button" onClick={goBack} className="notfound__button button">Назад</button>
    </section>
  )
}

export default NotFound