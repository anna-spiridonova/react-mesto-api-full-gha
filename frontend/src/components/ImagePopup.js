function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.isOpen ? "popup_opened" : ""}`}>
      <figure className="popup__image-container">
        <button className="popup__close-button button" type="button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__image-title">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;