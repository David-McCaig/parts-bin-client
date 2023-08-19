import { createContext, useState, useMemo } from 'react';
import { useAxiosFetch } from '../hooks/useAxiosFetch';
import { useAxiosFetchSetState } from '../hooks/useAxiosFetchSetState';

const ProductContext = createContext({});


export const ProductProvider = ({ children }) => {
    
    const { REACT_APP_API_URL } = process.env;
    
    const[updateProductToDisplay, setupdateProductToDisplay] = useState(false);
    //State variable for get request to all products.
    const [productsToDisplay, setproductsToDisplay] = useState([]);
    //State variable for bikes get request
    const [bikeToDisplay, setBikeToDisplay] = useState([]);
    // State variable. Initial state is an empty array
    const [ComponentToDisplay, setComponentToDisplay] = useState([]);

    
    //Get all products for HomePage.jsx
    const dependencyArray = useMemo(() => [updateProductToDisplay, REACT_APP_API_URL], [updateProductToDisplay, REACT_APP_API_URL]);
    const getAllProducts = useAxiosFetch(`${REACT_APP_API_URL}/product`, dependencyArray);
    useAxiosFetchSetState(getAllProducts.data, setproductsToDisplay)

    //Get request for BikesPage.jsx
    const getAllBikes = useAxiosFetch(`${REACT_APP_API_URL}/product/bikes`, REACT_APP_API_URL);
    useAxiosFetchSetState(getAllBikes.data, setBikeToDisplay)
    
    //Get request for BikeComponent.jsx
    const getAllBikeComponents = useAxiosFetch(`${REACT_APP_API_URL}/product/components`, REACT_APP_API_URL);
    useAxiosFetchSetState(getAllBikeComponents.data, setComponentToDisplay)

    return (
        <ProductContext.Provider value={{
            productsToDisplay,
            bikeToDisplay,
            ComponentToDisplay,
            setupdateProductToDisplay
        }} >

            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext