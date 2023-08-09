
import { Link } from "react-router-dom";
import './ProfileButton.css';

export default function ProfileButton ({ position })  {
  return (
    <Link
      className={`profile-link hover-link ${position}`}
      to='/profile'
      aria-label='Войти в свой профиль'
    >
      Аккаунт
      <div className='profile-link__box'>
      </div>
    </Link>
  );
};