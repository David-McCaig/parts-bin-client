import PrimaryCard from "../CardPrimary/CardPrimary";
import { useContext } from "react";
import ProductContext from "../../Contexts/ProductContext";

//renders the Primary card component with a list of all the different bikes avaialble.
const BikesList = () => {

  const { bikeToDisplay } = useContext(ProductContext);

  return (
    <>
      {bikeToDisplay.map((product) => {
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

export default BikesList;