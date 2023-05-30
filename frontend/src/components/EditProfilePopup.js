import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription ] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.onLoading && 'Сохранение...'}
    >
      <fieldset className="popup__input-container">
        <label className="popup__label">
          <input
            type="text"
            id="name"
            className="popup__input popup__input_type_info popup__input_type_name"
            name="name"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleNameChange}
          />
          <span className="name-error popup__error"></span>
        </label>
        <label className="popup__label">
          <input
            type="text"
            id="job"
            className="popup__input popup__input_type_info popup__input_type_job"
            name="job"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="job-error popup__error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
