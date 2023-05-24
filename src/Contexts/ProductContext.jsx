import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext({});


export const ProductProvider = ({ children }) => {

    const { REACT_APP_API_URL } = process.env;
    //State variable for get request to all products.
    const [productsToDisplay, setproductsToDisplay] = useState([]);
    //State variable for bikes get request
    const [bikeToDisplay, setBikeToDisplay] = useState([]);
    // State variable. Initial state is an empty array
    const [ComponentToDisplay, setComponentToDisplay] = useState([]);

    //Get all products for HomePage.jsx
    const renderProduct = () => {
        //Url for product endpoint stored in a variable.
        const urlForProductList = `${REACT_APP_API_URL}/product`;
        axios
            .get(urlForProductList)
            .then((response) => {
                // If request successful updates productToDisplay state with response data. Can access data through productToDisplay variable.
                setproductsToDisplay(response.data);
            })
            .catch((err) => {
                // If request not successful will console error message
                console.log(err);
            });
    }

    //Get request for BikesPage.jsx
    useEffect(() => {
        //URL for bikes endpoint stored in a variable
        const urlForProductList = `${REACT_APP_API_URL}/product/bikes`;
        axios
            .get(urlForProductList)
            .then((response) => {
                //update bikeToDisplay state with repsonse data
                setBikeToDisplay(response.data);
            })
            .catch((err) => {
                //console error if request fails.
                console.log(err);
            });
    }, [REACT_APP_API_URL]);

    //Get request for BikeComponent.jsx
    useEffect(() => {
        const urlForProductList = `${REACT_APP_API_URL}/product/components`;
        axios
            .get(urlForProductList)
            .then((response) => {
                //update componentToDisplay with response data
                setComponentToDisplay(response.data);
            })
            .catch((err) => {
                //console error message if request fails
                console.log(err);
            });
    }, [REACT_APP_API_URL]);

    return (
        <ProductContext.Provider value={{
            productsToDisplay,
            bikeToDisplay,
            ComponentToDisplay,
            renderProduct
        }} >

            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext