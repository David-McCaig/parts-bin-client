import Header from '../../Components/Header/Header';
import ProductCardList from '../../Components/ProductCardList/ProductCardList';
import SideScroll from '../../Components/SideScroll/SideScroll';
import BikesList from '../../Components/BikesList/BikesList';
import Banner from '../../Components/Banner.jsx/Banner';
import ButtonSecondary from '../../Components/ButtonSecondary/ButtonSecondary';
import BikeComponentsList from '../../Components/BikeComponents/BikeComponentsList'
import yeti from '../../assets/images/Yeti-SB135-SRAM-Transmission-Review-3.webp';
import chrisKing from '../../assets/images/Chris-King-Guest-House-1.webp'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Spin } from 'antd';
import './HomePage.scss';
import ProductContext from '../../Contexts/ProductContext';


function HomePage() {

  const navigate = useNavigate();

  const { productsToDisplay } = useContext(ProductContext);

  //Scroll to top on first render.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, []);



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

        < SideScroll
          title='New Arrivals - Used And New Bikes'
          onClick={() => navigate('/bikes')}
        >
          <BikesList />
        </SideScroll>

        <Banner
          image={chrisKing}
          title='Mountain Bike Components'
          description='ChrisKing hubs just in '
        >
          <ButtonSecondary styles={{ width: '10rem', height: '2.8rem' }} onClick={() => navigate('/components')}>
            View Components
          </ButtonSecondary>
        </Banner>

        < SideScroll
          title='New Arrivals - Used And New Components'
          onClick={() => navigate('/components')}
        >
          <BikeComponentsList />
        </SideScroll>

        <div className='bikes-list__mobile'>
          <BikesList />
        </div>

        <Banner
          image={yeti}
          title='Mountain Bikes'
          description='New Yeti mountain bike just in'
        >
          <ButtonSecondary styles={{ width: '10rem', height: '2.8rem' }} onClick={() => navigate('/bikes')}>
            View Bikes
          </ButtonSecondary>
        </Banner>

        <div className="product__list">
          <ProductCardList />
        </div>
      </main>
    </>
  );
};

export default HomePage;