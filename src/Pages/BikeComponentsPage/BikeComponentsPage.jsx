import BikeComponents from '../../Components/BikeComponents/BikeComponentsList';
import './BikeComponentsPage.scss';
import { useContext } from 'react';
import ProductContext from '../../Contexts/ProductContext';
import { Spin } from 'antd';


function ComponentsPage() {

  const { ComponentToDisplay } = useContext(ProductContext)

  //If no product to display, loading wheel will be displayed on screen.
  if (ComponentToDisplay.length === 0) {
    return (
        <Spin tip='Loading' size='large'>
          <div className="content" />
        </Spin>
    )
  }

  return (
    <>
      <article className='bike__list'>
        <BikeComponents/>
      </article>
    </>
  );
}
export default ComponentsPage;