import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getCurrentWeather, processWeather } from "../../utils/WeatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherType, setWeatherType] = useState("");
  const [radioError, setRadioError] = useState(false);
  const [inputsValid, setInputsValid] = useState(false);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    // api get location
    getCurrentWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = processWeather(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // check if name and URL are valid before flagging radio validation
    const nameValid = !errors.name && values.name;
    const urlValid = !errors.imageUrl && values.imageUrl;

    if (nameValid && urlValid) {
      setInputsValid(true);
      setRadioError(!weatherType);
    } else {
      setInputsValid(false);
      setRadioError(false);
    }
  }, [values, errors, weatherType]);

  // radio btn logic
  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
    handleChange(e);
    if (inputsValid) {
      setRadioError(false);
    }
  };

  // submit modal
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!weatherType) {
      setRadioError(true);
      return;
    }

    if (isValid && weatherType) {
      closeActiveModal();
      resetForm();
      setWeatherType("");
    } else {
      console.log("Form error");
    }
  };

  // add garment modal
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  // image preview modal
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  // close modal
  const closeActiveModal = () => {
    setActiveModal("");
    setRadioError(false);
  };

  // api user feedback and error catch
  if (isLoading) {
    return <div>Fetching Location...</div>;
  }

  if (error) {
    return <div>Error fetching weather data</div>;
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header weatherData={weatherData} handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        modalTitle="New garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
        className="modal__title"
        onSubmit={handleSubmit}
        isValid={isValid && !radioError}
      >
        {/* garment name */}
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
        {/* garment image url */}
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
        {/* radio */}
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
      <ItemModal
        isOpen={activeModal === "preview"}
        card={selectedCard}
        onClose={closeActiveModal}
      />

      <Footer />
    </div>
  );
}

export default App;
