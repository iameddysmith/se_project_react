import React, { useEffect, useRef } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ children, modalTitle, activeModal, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    // esc close
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // click close
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal__open" : ""}`}
    >
      <div className="modal__content" ref={modalRef}>
        <h2 className="modal__title">{modalTitle}</h2>
        <button
          onClick={onClose}
          className="modal__close_btn"
          type="button"
        ></button>
        {children}
      </div>
    </div>
  );
}

export default ModalWithForm;
