import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар пользователя"
            />
            <button
              className="profile__avatar-button button"
              type="button"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__row">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button button"
                type="button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="cards">
        {props.cards.map((item) => {
          return (
            <Card
            key={item._id}
            card={item}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete} />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
