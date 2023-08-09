import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import './Logo.css';

export default function Logo  ({ position })  {
  return (
    <Link className={`${position} logo hover-link`} to='/'>
      <img className='logo__img' src={logo} alt='Логотип Movies-Explorer' />
    </Link>
  );
};