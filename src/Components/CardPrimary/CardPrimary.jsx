import React from "react";
import { Link } from "react-router-dom";
import './CardPrimary.scss';


//PrimaryCard component used on HomePage.jsx, BikesPage.jsx and BikeComponentsPage.jsx.
const PrimaryCard = ({
  id,
  itemName,
  price,
  image,
}) => {
  return (
    <>
      <section className="product-card">
        <Link to={`/product/${id}`}>
          <img className="product-card__image" style={{height:'18rem'}} alt={'Mosaic bike for sale'} src={image}></img>
        </Link>
        <p className="product-card__price">{price}</p>
        <p className="product-card__title">{itemName}</p>
        <p className="product-card__location">Toronto,On</p>
      </section>

    </>
  );
}

export default PrimaryCard;