import React, { useContext, useState, useEffect } from "react";
import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  weatherData,
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isAvatarError, setIsAvatarError] = useState(false);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  //extract initials if invalid URL is provided for a default avatar
  const getInitials = (name) => {
    const nameParts = name.trim().split(" ");
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
        : nameParts[0][0];
    return initials.toUpperCase();
  };

  useEffect(() => {
    if (currentUser?.avatar) {
      setIsAvatarError(false);
    }
  }, [currentUser?.avatar]);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={headerLogo} alt="WTWR logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city || "City"}
      </p>
      <div className="header__btn-container">
        <ToggleSwitch />

        {currentUser ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__url">
              <div className="header__user-container">
                <p className="header__user-name">{currentUser.name}</p>
                {isAvatarError || !currentUser.avatar ? (
                  <div className="header__error-avatar">
                    {getInitials(currentUser.name || "User")}
                  </div>
                ) : (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                    onError={() => setIsAvatarError(true)}
                  />
                )}
              </div>
            </Link>
          </>
        ) : (
          <>
            <button onClick={handleRegisterClick} className="header__btn">
              Sign Up
            </button>
            <button onClick={handleLoginClick} className="header__btn">
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
