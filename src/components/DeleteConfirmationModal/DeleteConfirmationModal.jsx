import React from "react";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal modal_opened">
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeIcon}
            alt="close button"
            className="modal__close-btn"
          />
        </button>
        <h2 className="modal__caption">
          Are you sure you want to delete this item?
        </h2>
        <div className="modal__buttons">
          <button className="modal__button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal__button modal__button_confirm"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
