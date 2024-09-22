import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onLikeClick, currentUser }) {
  const isDefaultItem = !item.owner;
  const isLiked =
    currentUser && item.likes
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  return (
    <li className="card__container">
      <div className="card__header">
        <p className="card__caption">{item.name}</p>
        {currentUser && !isDefaultItem && (
          <button
            className={`card__react-button ${
              isLiked ? "card__react-button_active" : ""
            }`}
            onClick={(e) => {
              onLikeClick(item);
            }}
          />
        )}
      </div>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}

export default ItemCard;
