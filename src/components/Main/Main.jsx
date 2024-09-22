import React, { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  onCardLike,
  currentUser,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.temp?.[currentTemperatureUnit] || 999;

  return (
    <main>
      <WeatherCard
        selectedCondition={weatherData.condition}
        weatherData={weatherData}
      />
      <section className="cards">
        <p className="weather__wear-text">
          Today is {temp} &deg; {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems.length > 0 ? (
            clothingItems
              .filter((item) => item.weather === weatherData.type)
              .map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onLikeClick={onCardLike}
                  currentUser={currentUser}
                />
              ))
          ) : (
            <p className="cards__list-blank">
              No items available. Please add some items to the collection!
            </p>
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
