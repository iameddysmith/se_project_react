import "../../vendor/fonts.css";
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import FormValidator from "../../utils/FormValidator";
import { getCurrentWeather, processWeather } from "../../utils/WeatherApi";
import { coordinates, APIkey, settings } from "../../utils/constants";

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
  const formRef = useRef(null);
  const validatorRef = useRef(null);

  useEffect(() => {
    getCurrentWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = processWeather(data);
        setWeatherData(filteredData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (formRef.current) {
      validatorRef.current = new FormValidator(settings, formRef.current);
      validatorRef.current.enableValidation();
    }
  }, []);

  const handleWeatherTypeChange = (event) => {
    setWeatherType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validatorRef.current.isFormValid()) {
      closeActiveModal();
      formRef.current.reset();
      setWeatherType("");
    } else {
      console.log("Form error");
    }
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

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
        btnText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        className="modal__title"
      >
        <form ref={formRef} className="modal__form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__form-input"
              id="name"
              name="name"
              placeholder="Name"
              minLength="2"
              maxLength="40"
              required
            />
          </label>
          <span className="modal__form-input-error" id="name-error"></span>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__form-input"
              id="imageUrl"
              name="imageUrl"
              placeholder="Image URL"
              required
            />
          </label>
          <span className="modal__form-input-error" id="imageUrl-error"></span>
          <fieldset className="modal__radio-btns">
            <legend className="modal__legend">Select the weather type</legend>
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
                checked={weatherType === "cold"}
                onChange={handleWeatherTypeChange}
              />
              Cold
            </label>
          </fieldset>
          <span
            className="modal__form-input-error"
            id="weatherType-error"
          ></span>
          <button
            type="submit"
            className="modal__save-button"
            disabled={!validatorRef.current?.isFormValid()}
          >
            Add garment
          </button>
        </form>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
      <Footer />
    </div>
  );
}

export default App;
