import React from "react";
import PrimaryCard from "../CardPrimary/CardPrimary";
import { useContext } from "react";
import ProductContext from "../../Contexts/ProductContext";

const ProductCardList = () => {
  
  const { productsToDisplay } = useContext(ProductContext);

  return (
    <>
    {/* Displays all products on home page */}
      {productsToDisplay.map((product) => {
        return (
            <PrimaryCard
              key={product.id}
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

export default ProductCardList;