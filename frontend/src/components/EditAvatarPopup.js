import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, onLoading}) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={onLoading && 'Сохранение...'}
    >
      <fieldset className="popup__input-container">
        <label className="popup__label">
          <input
            type="url"
            id="avatar"
            className="popup__input popup__input_type_info popup__input_type_link"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
            ref={avatarRef}
          />
          <span className="avatar-error popup__error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
