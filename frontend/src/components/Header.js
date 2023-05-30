import logo from '../images/logo.svg';
import { Route, Routes, Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место Россия" />
      <Routes>
        <Route path="/sign-in" element={
          <Link to="/sign-up" className="link header__link">Регистрация</Link>
        } />
        <Route path="/sign-up" element={
          <Link to="/sign-in" className="link header__link">Войти</Link>
        }/>
        <Route path="/" element={
          <div className="header__container">
            <p className="header__email">{props.email}</p>
            <Link to="/sign-in" className="link header__link" onClick={props.onSingOut}>Выйти</Link>
          </div>
        }/>
      </Routes>
    </header>
  );
}

export default Header;