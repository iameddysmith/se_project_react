import React, { useRef, useEffect, useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToSignUp }) => {
  const formRef = useRef();
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation(formRef);

  const formId = "loginModal";

  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setIncorrectPassword(false);
      setIsButtonDisabled(false);
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsButtonDisabled(true);
      onLogin(values)
        .then(() => {
          setIncorrectPassword(false);
          setIsButtonDisabled(false);
        })
        .catch((err) => {
          if (err.message === "Incorrect email or password") {
            setIncorrectPassword(true);
            setIsButtonDisabled(true);
          } else {
            setIsButtonDisabled(false);
          }
        });
    }
  };

  const handleInputChange = (e) => {
    handleChange(e);
    if (incorrectPassword) {
      setIsButtonDisabled(false);
      setIncorrectPassword(false);
    }
  };

  return (
    <ModalWithForm
      modalTitle="Log In"
      buttonText="Log In"
      secondaryButtonText="or Sign Up"
      onSecondaryButtonClick={onSwitchToSignUp}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid && !isButtonDisabled}
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
          onChange={handleInputChange}
          required
          className="modal__form-input"
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

      <label
        htmlFor={`${formId}-password`}
        className={`modal__label ${
          incorrectPassword ? "modal__label_error" : ""
        }`}
      >
        {incorrectPassword ? "Incorrect Password" : "Password*"}
        <input
          type="password"
          id={`${formId}-password`}
          name="password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleInputChange}
          required
          className={`modal__form-input ${
            incorrectPassword
              ? "modal__form-input_type_error modal__form-input_text_error"
              : errors.password
              ? "modal__form-input_type_error"
              : ""
          }`}
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
    </ModalWithForm>
  );
};

export default LoginModal;
