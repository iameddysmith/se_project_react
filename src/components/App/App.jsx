import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { getCurrentWeather, processWeather } from "../../utils/WeatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  useEffect(() => {
    getCurrentWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = processWeather(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header weatherData={weatherData} />
        <Main weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
