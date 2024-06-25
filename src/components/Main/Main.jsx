import WeatherCard from "../WeatherCard/WeatherCard";

function Main({ weatherData }) {
  return (
    <main>
      <WeatherCard
        isDay={true}
        selectedCondition="sunny day"
        weatherData={weatherData}
      />
      <section className="cards">
        <p className="weather__wear-text">
          Today is {weatherData.temp.F} &deg; F / You may want to wear:
        </p>
      </section>
    </main>
  );
}

export default Main;
