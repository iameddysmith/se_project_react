import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__items">
        <p>Your items</p>
        <button className="clothes-btn" onClick={handleAddClick} type="button">
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {userItems.length > 0
          ? userItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onLikeClick={onCardLike}
              />
            ))
          : clothingItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onLikeClick={onCardLike}
              />
            ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
