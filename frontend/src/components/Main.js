import React from "react";
import penPath from "../images/pen.svg"
import Card from "./Card.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"

function Main(props) {

  const [overlayStatus, setOverLayStatus] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext)





  const cardItems = props.cards.map((card) => (
    <Card card={card} key={card._id} onCardClick={props.onCardClick} onLikeClick={props.onLikeClick} onCardDelete={props.onCardDelete} />
  ));

  function handleMouseEnter() {
    setOverLayStatus(true);
  }

  function handleMouseLeave() {
    setOverLayStatus(false);
  }



  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrapper" onClick={props.onEditAvatar} onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className={`profile__avatar-overlay ${overlayStatus ? "profile__avatar-overlay_active" : ""}`} >
            <img src={penPath} alt="" className="profile__avatar-overlay-image" />
          </div>
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__info-wrapper">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button className="profile__info-edit" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__info-bio">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section>
        <ul className="elements">
          {cardItems}
        </ul>
      </section>

    </main>
  )
}

export default Main;