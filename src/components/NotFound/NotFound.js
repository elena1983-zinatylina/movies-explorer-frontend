import './NotFound.css'
import {useNavigate} from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  return (
    <section className='not-found'>
      <div className="not-found__container">
        <h2 className='not-found__title'>
          404
        </h2>
        <p className='not-found__subtitle'>
          Страница не найдена
        </p>
        <button className='not-found__back-button' onClick={goBack}>
          Назад
        </button>
      </div>
    </section>
  );
}

export default NotFound;