import React from "react";
import logoPath from "../images/header-logo.svg"
import { useLocation, Link } from "react-router-dom";
import { CurrentEmailContext } from "../contexts/CurrentEmailContext.js"

function Hedaer(props) {
  let location = useLocation();
  const currentEmail = React.useContext(CurrentEmailContext)
  //console.log(location.pathname)
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="лого" />
      {location.pathname === '/sign-up' && <Link className="header__link" to="/sign-in">Войти</Link>}
      {location.pathname === '/sign-in' && <Link className="header__link" to="/sign-up">Регистрация</Link>}
      {location.pathname === '/' && <div><p onClick={props.signOut} className="header__link header__link_grey">Выйти</p><p className="header__link">{currentEmail}</p></div>}
    </header>
  )
}

export default Hedaer;