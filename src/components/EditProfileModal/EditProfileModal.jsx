import React, { useEffect, useRef } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const EditProfileModal = ({ isOpen, onClose, currentUser, onSave }) => {
  const formRef = useRef();
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation(formRef);

  useEffect(() => {
    if (isOpen) {
      resetForm({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
    }
  }, [isOpen, currentUser, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSave({ name: values.name.trim(), avatar: values.avatar });
    }
  };

  return (
    <ModalWithForm
      modalTitle="Edit Profile"
      buttonText="Save Changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      ref={formRef}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          id="name"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          className={"modal__form-input"}
          placeholder="Enter your name"
          required
          minLength="2"
          maxLength="40"
        />
      </label>
      <span
        className={`modal__form-input-error ${
          errors.name ? "modal__form-input-error_visible" : ""
        }`}
      >
        {errors.name}
      </span>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          id="avatar"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          className={`modal__form-input ${
            errors.avatar ? "modal__form-input_type_error" : ""
          }`}
          placeholder="Enter avatar URL"
          required
        />
      </label>
      <span
        className={`modal__form-input-error ${
          errors.avatar ? "modal__form-input-error_visible" : ""
        }`}
      >
        {errors.avatar}
      </span>
    </ModalWithForm>
  );
};

export default EditProfileModal;
