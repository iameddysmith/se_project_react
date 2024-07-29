import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card__container" onClick={() => onCardClick(item)}>
      <p className="card__caption">{item.name}</p>
      <img src={item.imageUrl} alt={item.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
