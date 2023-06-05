import BikesList from '../../Components/BikesList/BikesList';
import './BikesPage.scss';
import { Spin } from 'antd';
import { useContext, useEffect } from 'react';
import ProductContext from '../../Contexts/ProductContext';

function BikesPage() {

  const { bikeToDisplay } = useContext(ProductContext);

    //Scroll to top on first render.
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, []);

  //If no product to display, loading wheel will be displayed on screen.
  if (bikeToDisplay.length === 0) {
    return (
      <Spin tip='Loading' size='large'>
        <div className="content" />
      </Spin>
    )
  }

  return (
    <>
      <article className="bike__list">
        <BikesList />
      </article>
    </>
  );
}
export default BikesPage;