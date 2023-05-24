import React from "react";
import PrimaryCard from "../CardPrimary/CardPrimary";
import { v4 as uuidv4 } from 'uuid';
import ProductContext from "../../Contexts/ProductContext";
import { useContext } from "react";

//renders the Primary card component with a list of all the different bike components available.
const BikeComponentsList = () => {

  const { ComponentToDisplay } = useContext(ProductContext);

  return (
    <>
      {ComponentToDisplay.map((product) => {
        return (
            <PrimaryCard
              key={uuidv4()}
              id={product.id}
              customerName={product.user_name}
              itemName={product.item_name}
              price={product.price}
              image={product.image_path}
            />
        );
      })}
    </>
  );
};

export default BikeComponentsList;