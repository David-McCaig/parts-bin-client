import ProductDetails from '../../Components/ProductDetails/ProductDetails';
import { useState, useMemo } from 'react';
import { useAxiosFetch } from '../../hooks/useAxiosFetch';
import { useAxiosFetchSetState } from '../../hooks/useAxiosFetchSetState';
import { useScrollToTop } from '../../hooks/useScrollToTop'
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';

function ProductDetailsPage() {

    const { REACT_APP_API_URL } = process.env
    //extract id parameter from URL
    const { id } = useParams();

    // State variable. Initial state is an empty array
    const [productToDisplay, setProductToDisplay] = useState([]);
    const [productMessages, setProductMessages] = useState([])

    useScrollToTop();
    
    //Get request for individual products using id in the URL.
    const dependencyArray = useMemo(() => [REACT_APP_API_URL, id], [REACT_APP_API_URL, id]);
    const getProductById = useAxiosFetch(`${REACT_APP_API_URL}/product/${id}`, dependencyArray);
    useAxiosFetchSetState(getProductById.data, setProductToDisplay)


    //get chat messages based on product id
    const getChatMessagesById = useAxiosFetch(`${REACT_APP_API_URL}/chat/product/${id}`, dependencyArray);
    useAxiosFetchSetState(getChatMessagesById.data, setProductMessages)
   
    
    //if no product to display, loading wheel will be displayed on screen.
    if (productToDisplay.length === 0) {
        return (
            <Spin tip='Loading' size='large'>
                <div className="content" />
            </Spin>
        )
    }

    return (
        <article>
            <ProductDetails
                product={productToDisplay}
                id={id}
                productMessages={productMessages}
            />
        </article>
    );
}

export default ProductDetailsPage;