import Sidebar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleProfileEdit,
  handleLogout,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          handleProfileEdit={handleProfileEdit}
          handleLogout={handleLogout}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
