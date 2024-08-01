import React, { useEffect, useRef, useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const AddItemModal = ({ onClose, isOpen, onAddItem }) => {
  const formRef = useRef();
  const { values, handleChange, errors, isValid, resetForm, setIsValid } =
    useFormAndValidation(formRef);
  const [weatherType, setWeatherType] = useState("");
  const [radioError, setRadioError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (formRef.current && formRef.current.resetForm) {
        setWeatherType("");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const nameValid = !errors.name && values.name;
    const urlValid = !errors.imageUrl && values.imageUrl;
    setRadioError(!weatherType && nameValid && urlValid);

    setIsValid(nameValid && urlValid && weatherType);
  }, [values, errors, weatherType, setIsValid]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!weatherType) {
      setRadioError(true);
      return;
    }
    if (isValid) {
      onAddItem({ ...values, weatherType })
        .then(() => {
          resetForm();
          setWeatherType("");
          setRadioError(false);
          onClose();
        })
        .catch((err) => {
          console.error("Error submitting:", err);
        });
    } else {
      console.log("Form error");
    }
  };

  const handleRadioChange = (e) => {
    setWeatherType(e.target.value);
    setRadioError(false);
  };

  return (
    <ModalWithForm
      modalTitle="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddItem}
      isValid={isValid && !radioError}
      ref={formRef}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className={`modal__form-input ${
            errors.name ? "modal__form-input_type_error" : ""
          }`}
          id="name"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
      </label>
      <span
        className={`modal__form-input-error ${
          errors.name ? "modal__form-input-error_visible" : ""
        }`}
        id="name-error"
      >
        {errors.name}
      </span>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className={`modal__form-input ${
            errors.imageUrl ? "modal__form-input_type_error" : ""
          }`}
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl || ""}
          onChange={handleChange}
        />
      </label>
      <span
        className={`modal__form-input-error ${
          errors.imageUrl ? "modal__form-input-error_visible" : ""
        }`}
        id="imageUrl-error"
      >
        {errors.imageUrl}
      </span>
      <fieldset className="modal__radio-btns">
        <legend
          className={`modal__legend ${
            radioError
              ? "modal__legend_type_error"
              : "modal__legend_type_error-clear"
          }`}
        >
          Select the weather type
        </legend>
        <label
          htmlFor="hot"
          className={`modal__label modal__label_type_radio ${
            weatherType === "hot" ? "checked" : ""
          }`}
        >
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weatherType"
            value="hot"
            required
            checked={weatherType === "hot"}
            onChange={handleRadioChange}
          />
          Hot
        </label>
        <label
          htmlFor="warm"
          className={`modal__label modal__label_type_radio ${
            weatherType === "warm" ? "checked" : ""
          }`}
        >
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="weatherType"
            value="warm"
            required
            checked={weatherType === "warm"}
            onChange={handleRadioChange}
          />
          Warm
        </label>
        <label
          htmlFor="cold"
          className={`modal__label modal__label_type_radio ${
            weatherType === "cold" ? "checked" : ""
          }`}
        >
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="weatherType"
            value="cold"
            required
            checked={weatherType === "cold"}
            onChange={handleRadioChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
