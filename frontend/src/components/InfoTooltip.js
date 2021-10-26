import React from "react";
import okPath from "../images/ok.png"
import errorPath from "../images/error.png"

function InfoTooltip(props) {

  const okText = "Вы успешно зарегистрировались!";
  const errorText = "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div className={`popup ${props.isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <img className="tooltip__img" src={props.isOk ? okPath : errorPath} alt="resut" />
        <button className="popup__close-icon" type="button" onClick={props.onClose}></button>
        <p className="tooltip__text">{props.isOk ? okText : errorText}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;