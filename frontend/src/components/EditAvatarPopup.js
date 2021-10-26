import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} title="Заменить аватар" buttonText="Сохранить">
      <input className="popup__input" id="linkforava" name="link" placeholder="Ссылка на картинку" type="url" ref={inputRef} required />
      <span className="popup__error linkforava-error"></span>
    </PopupWithForm>

  )
}

export default EditAvatarPopup;