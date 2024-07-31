import React, { useEffect, useRef } from "react";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  const modalRef = useRef();

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__content modal__content-confirm" ref={modalRef}>
        <h2 className="modal__caption modal__caption-confirm">
          Are you sure you want to delete this item?
          <p className="modal__sub-caption">This action is irreversible.</p>
        </h2>
        <div className="modal__buttons">
          <button
            className="modal__button modal__button_confirm"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            className="modal__button modal__button-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
