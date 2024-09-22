import React, { useContext, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser && clothingItems.length > 0) {
      setLoading(false);
    } else if (!currentUser) {
      setLoading(false);
    }
  }, [clothingItems, currentUser]);

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
          {loading ? (
            <p className="cards__list-blank">
              {currentUser ? "Fetching clothing items..." : "Loading..."}
            </p>
          ) : clothingItems.length === 0 && currentUser ? (
            <p className="cards__list-blank">
              No items available. Please add some items to the collection!
            </p>
          ) : (
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
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
