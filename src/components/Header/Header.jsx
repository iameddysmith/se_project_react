import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import headerAvatar from "../../assets/avatar.png";
import "./Header.css";

function Header({ weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="App logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button className="header__add-clothes-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__user-name">Eddy Smith</p>
        <img src={headerAvatar} alt="avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
