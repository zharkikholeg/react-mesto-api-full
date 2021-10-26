import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_for-${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__heading">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <input className="popup__submit" type="submit" value={props.buttonText} />
        </form>
        <button className="popup__close-icon" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm;