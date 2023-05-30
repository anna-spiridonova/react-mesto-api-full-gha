import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import { api } from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() { 
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: ""
  });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen ||
    isTooltipPopupOpen;

    
  // открытие и закрытие попапов
  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true)
    }
    function closeAllPopups() {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCard({});
      setIsImagePopupOpen(false);
      setIsTooltipPopupOpen(false);
    }
    function handleCardClick(card) {
      setSelectedCard(card);
      setIsImagePopupOpen(true)
    }
  
  //запросы к api
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([resUserInfo, resInitialCards]) => {
      setCurrentUser(resUserInfo)
      setCards(resInitialCards);
    })
    .catch((err) => {
      console.log(err)
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id)); 
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleUpdateUser({name, about}) {
    setIsLoading(true);
    api.editProfileInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar({avatar}) {
    setIsLoading(true);
    api.editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit({name, link}) {
    setIsLoading(true);
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  //регистрация и авторизация
  function handleLogin(email) {
    setLoggedIn(true);
    setEmail(email)
  };

  function handleLoginSubmit (email, password) {
    auth.authorize(email, password)
    .then((res) => {
      if(res.token) {
        localStorage.setItem('jwt', res.token);
      };
      handleLogin(email);
      navigate("/")
    })
    .catch((err) => {
      console.log(err)
    });
  }

  function handleRegisterSubmit (email, password) {
    auth.register(email, password)
      .then(() => {
        setIsSuccess(true);
        navigate("/sign-in")
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err)
      })
      .finally(() => setIsTooltipPopupOpen(true))
  }

  function singOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false)
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if(!jwt) {
      return
    };
    auth.getContent(jwt)
      .then((res) => {
        if(res) {
          handleLogin(res.data.email);
          navigate("/")
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  useEffect(() => {
    tokenCheck()
  }, [])



  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="root">
        <Header
          email={email}
          onSingOut={singOut}
        />
        
        <InfoTooltip
          name={"tooltip"}
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onCardDelete={handleCardDelete}
            />
          }/>
          <Route path='/sign-up' element={
            <Register onRegister={handleRegisterSubmit}/>
          }/>
          <Route path='/sign-in' element={<Login onLogin={handleLoginSubmit}/>}/>
        </Routes>

        {loggedIn && <Footer />}

        {/* форма редактора профиля */}
        <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onLoading={isLoading}
        />

        {/* форма редактора аватара */}
        <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onLoading={isLoading}
        />

        {/* форма создания карточки */}
        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onLoading={isLoading}
        />

        {/* форма подтверждения удаления */}
        <PopupWithForm
          name={"confirm"}
          title={"Вы уверены?"}
          buttonValue={"Да"}
        />

        <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
