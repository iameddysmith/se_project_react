import React, { useState, useEffect, useRef } from "react";
import "./ItemModal.css";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function ItemModal({ isOpen, card, onClose, onDeleteItem, setActiveModal }) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const modalRef = useRef();

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
    onClose();
  };

  const handleDeleteConfirm = () => {
    onDeleteItem(card);
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setActiveModal("preview");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (isDeleteModalOpen) {
          setDeleteModalOpen(false);
        } else {
          onClose();
        }
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (isDeleteModalOpen) {
          setDeleteModalOpen(false);
        } else {
          onClose();
        }
      }
    };

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
  }, [isOpen, isDeleteModalOpen, onClose]);

  return (
    <>
      <div
        className={`modal ${isOpen ? "modal_open" : ""} ${
          !isOpen && "modal_close"
        }`}
      >
        <div
          className="modal__content modal__content_type_image"
          ref={modalRef}
        >
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
            <button className="modal__delete-btn" onClick={handleDeleteClick}>
              Delete item
            </button>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default ItemModal;
