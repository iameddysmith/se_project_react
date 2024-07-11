import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_open"}`}>
      <div className="modal__content modal__content_type_image modal_open-preview">
        <button
          onClick={onClose}
          className="modal__close_btn modal__close_btn-light"
          type="button"
        ></button>
        <div className="modal__image-container">
          <img src={card.link} alt={card.name} className="modal__image" />
        </div>
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
