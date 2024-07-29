import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getCurrentWeather, processWeather } from "../../utils/WeatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { getItems, postItems, deleteItem } from "../../utils/AddItemApi";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";

function App() {
  //var
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  //api get location
  useEffect(() => {
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

  // generate cards
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setError(error);
      });
  }, []);

  //temperature unit toggle [F,C]
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };

  //add garment
  const handleAddItem = (item) => {
    postItems(item.name, item.imageUrl, item.weatherType)
      .then((newCard) => {
        setClothingItems([newCard, ...clothingItems]);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Error submitting:", err);
      });
  };

  //remove garment
  const handleDeleteItem = (item) => {
    deleteItem(item)
      .then((res) => {
        const newClothingItems = clothingItems.filter(
          (cardItem) => cardItem._id !== item._id
        );
        setClothingItems(newClothingItems);
        setActiveModal("");
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  //open add garment
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  //open image preview
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };
  //close modal
  const closeActiveModal = () => {
    setActiveModal("");
  };

  // api user feedback and error catch
  if (isLoading) {
    return <div>Fetching Location...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header weatherData={weatherData} handleAddClick={handleAddClick} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItem}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          onDeleteItem={handleDeleteItem}
        />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
