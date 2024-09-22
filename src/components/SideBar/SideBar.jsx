import React, { useContext, useState, useEffect } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Sidebar({ handleProfileEdit, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [isAvatarError, setIsAvatarError] = useState(false);

  // Extract initials if invalid URL is provided for a default avatar
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

  if (!currentUser) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {isAvatarError || !currentUser.avatar ? (
          <div className="sidebar__error-avatar">
            {getInitials(currentUser.name || "User")}
          </div>
        ) : (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name || "User"}
            onError={() => setIsAvatarError(true)}
          />
        )}
        <p className="sidebar__username">{currentUser.name || "User"}</p>
      </div>
      <button className="sidebar__button" onClick={handleProfileEdit}>
        Change profile data
      </button>
      <button className="sidebar__button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default Sidebar;
