import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"
import PopupWithForm from "./PopupWithForm"

function EditProfilePopup(props) {

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} title="Редактировать профиль" buttonText="Сохранить">
      <input className="popup__input " type="text" value={name} onChange={handleNameChange} id="name" name="name" minLength="2" maxLength="40" required />
      <span className="popup__error name-error"></span>
      <input className="popup__input" type="text" value={description} onChange={handleDescriptionChange} id="bio" name="bio" minLength="2" maxLength="200" required />
      <span className="popup__error bio-error"></span>
    </PopupWithForm>

  )
}

export default EditProfilePopup;