import React, { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  modalTitle,
  buttonText,
  activeModal,
  onClose,
  className,
  onSubmit,
  isValid,
  children,
}) {
  // alt close modal
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

    if (activeModal) {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeModal, onClose]);

  return (
    <div className={`modal ${activeModal ? "modal_open" : ""}`}>
      <div className={`modal__content ${className}`}>
        <button
          onClick={onClose}
          className="modal__close_btn"
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
