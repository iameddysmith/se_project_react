import "./WeatherCard.css";
import { weatherConditions } from "../../utils/constants.js";

function WeatherCard({ weatherData, selectedCondition }) {
  const weather = weatherConditions.find(
    (item) => item.name === selectedCondition
  );

  if (!weather) {
    return <div>Condition not found</div>;
  }

  return (
    <section className="weather__card">
      <h1 className="weather__card-text">{weatherData.temp.F} &deg; F</h1>
      <img
        className="weather__card-img"
        src={weather.image}
        alt={weather.weather || "weather"}
      />
    </section>
  );
}

export default WeatherCard;
