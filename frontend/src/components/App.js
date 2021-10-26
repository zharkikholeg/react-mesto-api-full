import React from "react"
import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import ImagePopup from "./ImagePopup.js"
import api from "../utils/Api.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"
import { CurrentEmailContext } from '../contexts/CurrentEmailContext.js'
import EditProfilePopup from "./EditProfilePopup.js"
import EditAvatarPopup from "./EditAvatarPopup.js"
import AddPlacePopup from './AddPlacePopup.js'
import { Route, Switch, withRouter } from 'react-router-dom';
import Register from "./Register.js"
import Login from "./Login.js"
import ProtectedRoute from "./ProtectedRoute.js"
import { getContent } from '../utils/Auth'


function App(props) {

  const defaultUser = {
    name: "Loading",
    about: "Loading",
    avatar: "https://yandex.com"
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddStatus] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvaStatus] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(defaultUser);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentEmail, setCurrentEmail] = React.useState('')


  React.useEffect(() => {
    api.getUser()
      .then(res => {
        console.log(res)
        setCurrentUser(res[0]);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    api.getAllCards()
      .then(res => {
        setCards(res);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    tokenCheck();
  }, [])


  function handleLikeClick(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    //Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });

    } else {
      api.removeLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddStatus(true);
  }

  function handleEditAvatarClick() {
    setAvaStatus(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Проверяем, какой именно попап открыт, чтобы не задействовать хук всегда по 3 раза
  function closeAllPopups() {
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    isAddPlacePopupOpen && setAddStatus(false);
    isEditAvatarPopupOpen && setAvaStatus(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api.editUser(name, about)
      .then((res) => {
        //console.log(res);
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    //console.log(avatar);
    api.changeAvatar(avatar)
      .then((res) => {
        //console.log(res);
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })

  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })

  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then((res) => {
        setCards(cards.filter(function (card) {
          return card._id !== cardId;
        }))
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })

  }

  function handleLogin(email) {
    setLoggedIn(true);
    setCurrentEmail(email);
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            props.history.push('/');
          }
        })

    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    props.history.push('/sign-in');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentEmailContext.Provider value={currentEmail}>
          <Header signOut={signOut} />
          <Switch>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <ProtectedRoute
              path="/"
              exact
              component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onLikeClick={handleLikeClick}
              onCardDelete={handleCardDelete}
            />
          </Switch>
          <Footer />
          <EditProfilePopup name="editing" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup name="adding" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onPlaceSubmit={handleAddPlaceSubmit} />
          <EditAvatarPopup name="ava" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentEmailContext.Provider>
      </CurrentUserContext.Provider>



    </div >
  );
}



export default withRouter(App);
