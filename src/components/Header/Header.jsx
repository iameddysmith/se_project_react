import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import headerAvatar from "../../assets/avatar.png";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ weatherData, handleAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={headerLogo} alt="WTWR logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__btn-container">
        <ToggleSwitch />

        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      </div>
      <Link to="/profile" className="header__url">
        <div className="header__user-container">
          <p className="header__user-name">Eddy Smith</p>
          <img src={headerAvatar} alt="avatar" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
