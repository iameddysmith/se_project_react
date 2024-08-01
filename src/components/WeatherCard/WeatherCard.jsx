import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import React, { useContext, useState, useEffect, useRef } from "react";
import {
  weatherConditions,
  defaultWeatherConditions,
} from "../../utils/constants.js";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const [temp, setTemp] = useState(
    weatherData?.temp?.[currentTemperatureUnit] || 999
  );
  const [fadeClass, setFadeClass] = useState("fade-in");
  const prevUnit = useRef(currentTemperatureUnit);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      setTemp(weatherData?.temp?.[currentTemperatureUnit] || 999);
      return;
    }

    if (currentTemperatureUnit !== prevUnit.current) {
      setFadeClass("fade-out");
      const timeout = setTimeout(() => {
        setTemp(weatherData?.temp?.[currentTemperatureUnit] || 999);
        setFadeClass("fade-in");
      }, 200);

      prevUnit.current = currentTemperatureUnit;

      return () => clearTimeout(timeout);
    }
  }, [currentTemperatureUnit, weatherData]);

  const weather = weatherConditions.filter((option) => {
    return (
      option.isDay === weatherData.isDay &&
      option.condition.includes(weatherData.condition)
    );
  });

  let weatherOption;

  if (weather.length === 0) {
    weatherOption =
      defaultWeatherConditions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = weather[0];
  }

  return (
    <section className="weather__card">
      <div className="weather__temp-container">
        <h1 className={`weather__card-text ${fadeClass}`}>
          {temp} &deg; {currentTemperatureUnit}
        </h1>
      </div>
      <img
        className="weather__card-img"
        src={weatherOption.image}
        alt={weatherOption.name || "weather"}
      />
    </section>
  );
}

export default WeatherCard;
