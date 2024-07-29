import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick }) {
  if (!clothingItems) {
    return <div>No items to display</div>;
  }

  return (
    <div className="clothes-section">
      <div className="clothes-section__items">
        <p>Your items</p>
        <button className="clothes-btn" onClick={handleAddClick} type="button">
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
