import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card__container" key={item._id}>
      <h2 className="card__caption">{item.name}</h2>
      <img
        src={item.link}
        alt={item.name}
        className="card__image"
        onClick={handCardClick}
      />
    </li>
  );
}

export default ItemCard;
