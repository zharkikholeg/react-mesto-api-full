import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onPlaceSubmit({
      name: name,
      link: link
    });

    setName('');
    setLink('');
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} title="Новое место" buttonText="Создать">
      <input className="popup__input" type="text" id="placename" name="placename" placeholder="Название" minLength="2" maxLength="30" value={name} onChange={handleNameChange} required />
      <span className="popup__error placename-error"></span>
      <input className="popup__input" id="link" name="link" placeholder="Ссылка на картинку" type="url" value={link} onChange={handleLinkChange} required />
      <span className="popup__error link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;