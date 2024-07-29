import React, { useState, useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const AddItemModal = ({ onClose, isOpen, onAddItem }) => {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } =
    useFormAndValidation();
  const [weatherType, setWeatherType] = useState("");
  const [radioError, setRadioError] = useState(false);

  useEffect(() => {
    const nameValid = !errors.name && values.name;
    const urlValid = !errors.imageUrl && values.imageUrl;
    setRadioError(nameValid && urlValid && !weatherType);

    setIsValid(nameValid && urlValid && weatherType);
  }, [values, errors, weatherType, setIsValid]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!weatherType) {
      setRadioError(true);
      return;
    }
    if (isValid && weatherType) {
      onAddItem({ ...values, weatherType });
      resetForm();
      setWeatherType("");
      onClose();
    } else {
      console.log("Form error");
    }
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
    setRadioError(false);
    setIsValid(
      !errors.name &&
        values.name &&
        !errors.imageUrl &&
        values.imageUrl &&
        e.target.value
    );
  };

  return (
    <ModalWithForm
      modalTitle="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      className="modal__title"
      onSubmit={handleAddItem}
      isValid={isValid && !radioError}
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
            onChange={handleWeatherTypeChange}
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
            onChange={handleWeatherTypeChange}
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
            onChange={handleWeatherTypeChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
