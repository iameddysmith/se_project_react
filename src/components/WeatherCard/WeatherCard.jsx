import "./WeatherCard.css";
import {
  weatherConditions,
  defaultWeatherConditions,
} from "../../utils/constants.js";

function WeatherCard({ weatherData }) {
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
      <h1 className="weather__card-text">{weatherData.temp.F} &deg; F</h1>
      <img
        className="weather__card-img"
        src={weatherOption.image}
        alt={weatherOption.name || "weather"}
      />
    </section>
  );
}

export default WeatherCard;
