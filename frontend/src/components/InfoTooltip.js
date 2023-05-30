import checkMark from '../images/check-mark.png';
import cross from '../images/cross.png';

function InfoTooltip({onClose, isSuccess, name, isOpen}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button
          className="popup__close-button button"
          type="button"
          onClick={onClose}
        />
          <>
            <img 
            className="popup__icon"
            src={isSuccess ? checkMark : cross}
            alt={isSuccess ? "Успешная регистрация" : "Ошибка регистрации"}
            />
            <h2 className="popup__tooltip">
              {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
              </h2>
          </>
      </div>
    </div>
  );
}

export default InfoTooltip;
