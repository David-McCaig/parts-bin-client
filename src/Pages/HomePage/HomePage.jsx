import Header from '../../Components/Header/Header';
import ProductCardList from '../../Components/ProductCardList/ProductCardList';
import SideScroll from '../../Components/SideScroll/SideScroll';
import BikesList from '../../Components/BikesList/BikesList';
import { Children, useContext, useEffect } from 'react';
import { Spin } from 'antd';
import './HomePage.scss';
import ProductContext from '../../Contexts/ProductContext';


function HomePage() {
  
  const { productsToDisplay } = useContext(ProductContext);

    //Scroll to top on first render.
    useEffect(() => {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    },[]);



  //If no product to display, loading wheel will be displayed on screen
  if (productsToDisplay.length === 0) {
    return (
      <Spin tip='Loading' size='large'>
        <div className="content" />
      </Spin>
    )
  };

  return (
    <>
      <main className='home__load'>
        {/* <HeaderTwo/> */}
        <Header />
        < SideScroll title='New Arrivals - Used And New Bikes' >
        <BikesList/>
        </SideScroll>
        <div className="product__list">
          <ProductCardList />
        </div>
      </main>
    </>
  );
};

export default HomePage;