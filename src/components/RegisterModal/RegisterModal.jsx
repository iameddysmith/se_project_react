import React, { useRef, useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const RegisterModal = ({ isOpen, onClose, onRegister, onSwitchToLogin }) => {
  const formRef = useRef();
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation(formRef);

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
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          id="email"
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
      >
        {errors.email}
      </span>

      <label htmlFor="password" className="modal__label">
        Password*
        <input
          type="password"
          id="password"
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
      >
        {errors.password}
      </span>

      <label htmlFor="name" className="modal__label">
        Name*
        <input
          type="text"
          id="name"
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
      >
        {errors.name}
      </span>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL*
        <input
          type="url"
          id="avatar"
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
      >
        {errors.avatar}
      </span>
    </ModalWithForm>
  );
};

export default RegisterModal;
