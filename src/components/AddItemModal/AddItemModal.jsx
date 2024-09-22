import React, { useEffect, useRef, useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const AddItemModal = ({ onClose, isOpen, onAddItem }) => {
  const formRef = useRef();
  const { values, handleChange, errors, resetForm } =
    useFormAndValidation(formRef);
  const [weatherType, setWeatherType] = useState("");
  const [radioError, setRadioError] = useState(false);
  const [formValidCheck, setFormValidCheck] = useState(false);

  const formId = "addItemModal";

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setWeatherType("");
      setFormValidCheck(false);
    }
  }, [isOpen, resetForm]);

  useEffect(() => {
    const nameValid = values.name && !errors.name && values.name.trim() !== "";
    const urlValid =
      values.imageUrl && !errors.imageUrl && values.imageUrl.trim() !== "";

    setFormValidCheck(nameValid && urlValid && weatherType);
    setRadioError(!weatherType && nameValid && urlValid);
  }, [values, errors, weatherType]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!weatherType) {
      setRadioError(true);
      return;
    }
    if (formValidCheck) {
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
      isValid={formValidCheck}
      ref={formRef}
    >
      <label htmlFor={`${formId}-name`} className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__form-input"
          id={`${formId}-name`}
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
        id={`${formId}-name-error`}
      >
        {errors.name}
      </span>

      <label htmlFor={`${formId}-imageUrl`} className="modal__label">
        Image{" "}
        <input
          type="url"
          className={`modal__form-input ${
            errors.imageUrl ? "modal__form-input_type_error" : ""
          }`}
          id={`${formId}-imageUrl`}
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
        id={`${formId}-imageUrl-error`}
      >
        {errors.imageUrl}
      </span>

      <fieldset className="modal__radio-btns">
        <legend
          className={`modal__legend ${
            radioError ? "modal__legend_type_error" : ""
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
