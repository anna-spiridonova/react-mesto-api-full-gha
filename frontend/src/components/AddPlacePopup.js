import { useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink ] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name={"place"}
      title={"Новое место"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.onLoading ? 'Сохранение...' : 'Создать'}
    >
      <fieldset className="popup__input-container">
        <label className="popup__label">
          <input
            type="text"
            id="title"
            className="popup__input popup__input_type_info popup__input_type_title"
            name="name"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
          />
          <span className="title-error popup__error"></span>
        </label>
        <label className="popup__label">
          <input
            type="url"
            id="link"
            className="popup__input popup__input_type_info popup__input_type_link"
            name="link"
            placeholder="Ссылка на картинку"
            required
            value={link}
            onChange={handleLinkChange}
          />
          <span className="link-error popup__error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
