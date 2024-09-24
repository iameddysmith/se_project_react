import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Sidebar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getCurrentWeather, processWeather } from "../../utils/WeatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  getItems,
  postItems,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/AddItemApi";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { register, login, checkToken, updateProfile } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Switch between login and sign-up modals
  const switchToLogin = () => setActiveModal("login");
  const switchToSignUp = () => setActiveModal("register");

  // Handle modal close
  const closeActiveModal = () => setActiveModal("");

  // Fetch weather data
  useEffect(() => {
    getCurrentWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = processWeather(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // Fetch all items
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  // Temperature unit toggle [F, C]
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  // Add garment
  const handleAddItem = (item) => {
    return postItems(item.name, item.imageUrl, item.weatherType).then(
      (newCard) => {
        setClothingItems((prevItems) => [newCard, ...prevItems]);
        closeActiveModal();
      }
    );
  };

  // Remove garment
  const handleDeleteItem = (item) => {
    return deleteItem(item).then(() => {
      const newClothingItems = clothingItems.filter(
        (cardItem) => cardItem._id !== item._id
      );
      setClothingItems(newClothingItems);
      closeActiveModal();
    });
  };

  // Token check for logged-in users
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((userData) => {
          setCurrentUser(userData);
          setToken(jwt);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token check failed:", err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle registration
  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password }).then(() => {
      handleLogin({ email, password });
    });
  };

  // Handle login
  const handleLogin = ({ email, password }) => {
    return (
      login({ email, password })
        .then((res) => {
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          return checkToken(res.token);
        })
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          closeActiveModal();
        })
        //this catch is needed for the Incorrect Password
        .catch((err) => {
          throw new Error("Incorrect email or password");
        })
    );
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  // Open add garment modal
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  // Open image preview
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  // Open edit profile modal
  const handleProfileEdit = () => {
    setActiveModal("edit-profile");
  };

  // Handle profile update
  const handleProfileUpdate = (updatedData) => {
    return updateProfile(updatedData, token).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeActiveModal();
    });
  };

  // Handle card like
  const handleCardLike = (item) => {
    const isLiked = item.likes.some((id) => id === currentUser._id);
    const apiCall = isLiked ? removeCardLike : addCardLike;

    return apiCall(item._id, token).then((updatedCard) => {
      setClothingItems((items) =>
        items.map((card) => (card._id === item._id ? updatedCard : card))
      );
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              handleRegisterClick={switchToSignUp}
              handleLoginClick={switchToLogin}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    currentUser={currentUser}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={
                        currentUser
                          ? clothingItems.filter(
                              (item) => item.owner === currentUser._id
                            )
                          : []
                      }
                      handleAddClick={handleAddClick}
                      handleProfileEdit={handleProfileEdit}
                      handleLogout={handleLogout}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sidebar"
                element={
                  token ? (
                    <Sidebar
                      handleProfileEdit={handleProfileEdit}
                      handleLogout={handleLogout}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </div>

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            onSwitchToLogin={switchToLogin}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onSwitchToSignUp={switchToSignUp}
          />

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
            setActiveModal={setActiveModal}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            currentUser={currentUser}
            onSave={handleProfileUpdate}
          />

          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
