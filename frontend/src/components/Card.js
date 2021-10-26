import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";


function Card(props) {

  const currentUser = React.useContext(CurrentUserContext)
  const isOwner = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onLikeClick(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id)
  }

  return (
    <li className="element" >
      <div className="element__image-wrapper">
        <button type="button" className={isOwner ? "element__trash" : "element__trash_invisible"} onClick={handleDeleteClick}></button>
        <img className="element__image" alt={props.card.name} src={props.card.link} onClick={handleClick} />
      </div>
      <div className="element__wrapper">
        <h3 className="element__text">{props.card.name}</h3>
        <div className="element__likes-wrapper">
          <button type="button" className={isLiked ? "element__heart element__heart_active" : "element__heart"} onClick={handleLikeClick}></button>
          <p className="element__likecount">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;