function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button button" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button
            type="submit"
            className="button popup__input popup__input_type_save"
          >
            {props.buttonText || "Сохранить"}
          </button>        
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
