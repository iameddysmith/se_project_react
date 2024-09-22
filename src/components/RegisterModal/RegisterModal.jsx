import React, { useRef, useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const RegisterModal = ({ isOpen, onClose, onRegister, onSwitchToLogin }) => {
  const formRef = useRef();
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation(formRef);

  const formId = "registerModal";

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister(values);
    }
  };

  return (
    <ModalWithForm
      modalTitle="Sign Up"
      buttonText="Sign Up"
      secondaryButtonText="or Log In"
      onSecondaryButtonClick={onSwitchToLogin}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      ref={formRef}
    >
      <label htmlFor={`${formId}-email`} className="modal__label">
        Email*
        <input
          type="email"
          id={`${formId}-email`}
          name="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
          className={"modal__form-input"}
        />
      </label>
      <span
        className={`modal__form-input-error ${
          errors.email ? "modal__form-input-error_visible" : ""
        }`}
        id={`${formId}-email-error`}
      >
        {errors.email}
      </span>

      <label htmlFor={`${formId}-password`} className="modal__label">
        Password*
        <input
          type="password"
          id={`${formId}-password`}
          name="password"
          placeholder="Password"
          minLength="2"
          value={values.password || ""}
          onChange={handleChange}
          required
          className={"modal__form-input"}
        />
      </label>
      <span
        className={`modal__form-input-error ${
          errors.password ? "modal__form-input-error_visible" : ""
        }`}
        id={`${formId}-password-error`}
      >
        {errors.password}
      </span>

      <label htmlFor={`${formId}-name`} className="modal__label">
        Name*
        <input
          type="text"
          id={`${formId}-name`}
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          value={values.name || ""}
          onChange={handleChange}
          required
          className={"modal__form-input"}
        />
      </label>
      <span
        className={`modal__form-input-error ${
          errors.name ? "modal__form-input-error_visible" : ""
        }`}
        id={`${formId}-name-error`}
      >
        {errors.name}
      </span>

      <label htmlFor={`${formId}-avatar`} className="modal__label">
        Avatar URL*
        <input
          type="url"
          id={`${formId}-avatar`}
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
          required
          className={"modal__form-input"}
        />
      </label>
      <span
        className={`modal__form-input-error ${
          errors.avatar ? "modal__form-input-error_visible" : ""
        }`}
        id={`${formId}-avatar-error`}
      >
        {errors.avatar}
      </span>
    </ModalWithForm>
  );
};

export default RegisterModal;
