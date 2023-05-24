import ProductDetails from '../../Components/ProductDetails/ProductDetails';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';

function ProductDetailsPage() {

    //extract id parameter from URL
    const { id } = useParams();

    // State variable. Initial state is an empty array
    const [productToDisplay, setProductToDisplay] = useState([]);
    const [productMessages, setProductMessages] = useState([])

    //Get request for individual products using id in the URL.
    useEffect(() => {
        const urlForProductList = `http://localhost:8000/product/${id}`;
        axios
            .get(urlForProductList)
            .then((res) => {
                //if get request successful update the ProductToDisplay with response data
                setProductToDisplay(res.data);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            })
            .catch((err) => {
                //if get request not successful console error message
                console.log(err)
            })
    }, [id])

    //get chat messages based on product id
    useEffect(() => {
        axios
            .get(`http://localhost:8000/chat/product/${id}`)
            .then((res) => {
                setProductMessages(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])


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