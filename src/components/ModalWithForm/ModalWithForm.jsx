import React, { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  modalTitle,
  buttonText,
  isOpen,
  onClose,
  className,
  onSubmit,
  isValid,
  children,
}) {
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

  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className={`modal__content ${className}`}>
        <button
          onClick={onClose}
          className="modal__close_btn modal__close_btn-dark"
          type="button"
        ></button>
        <h2 className="modal__title">{modalTitle}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="modal__save-button"
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
