import React, { useEffect, useRef } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ children, modalTitle, activeModal, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    // click close
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal_open" : ""}`}
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
