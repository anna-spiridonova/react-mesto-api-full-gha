import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__like-button button ${isLiked && 'card__like-button_active'}` 
  );

  function handleClick() {
    props.onCardClick(props.card);
  }  

  function handleDeleteClick(){
    props.onCardDelete(props.card);
  }

  function handleLikeClick(){
    props.onCardLike(props.card)
  }

  return (
    <article className="card">
      {isOwn && <button type="button" className="card__delete-button button" onClick={handleDeleteClick} />} 
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;