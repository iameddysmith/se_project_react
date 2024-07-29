import React, { useEffect } from "react";
import "./ItemModal.css";

function ItemModal({ isOpen, card, onClose, onDeleteItem }) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (e.target.closest(".modal__content") === null) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleDelete = () => {
    onDeleteItem(card);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__close_btn modal__close_btn-dark"
          type="button"
        ></button>
        <div className="modal__image-container">
          <img src={card.imageUrl} alt={card.name} className="modal__image" />
        </div>
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button className="modal__delete-btn" onClick={handleDelete}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
