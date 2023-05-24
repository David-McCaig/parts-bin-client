import './ProductDetails.scss'
import { useState, useContext, useEffect } from "react";
import AuthContext from '../../Contexts/AuthContext';
import ChatContext from '../../Contexts/ChatContext';
import { useNavigate } from 'react-router';
import { ImLocation2 } from "react-icons/im";
import { TbFileDescription } from "react-icons/tb";
import { ImPriceTags } from "react-icons/im";
import { GrContact } from "react-icons/gr";
import { CgNametag } from "react-icons/cg";
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import { v4 as uuidv4 } from 'uuid';
import { Spin } from 'antd';


function ProductDetails({ product, id, productMessages }) {

  const { socket, room, setRoom, setProductId, setMessagesReceived } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Add a check to ensure that the "customer_name" property exists on the "user" object
  const username = user.customer_name ? user.customer_name : '';
  const email = user.email ? user.email : '';

  //Checks if chat between users exists. if it exists, sets room to existing room id. If it doesn't it will set room to new id created by uuid.
  useEffect(() => {
    let findEmail = productMessages.filter(c => c.email === email).find(n => n.email)
    findEmail = findEmail ? findEmail.email : '';

    let findId = productMessages.filter(c => c.email === email)
    findId = findId.find(n => n.room)
    let roomId = findId ? findId.room : '';

    if (findEmail === email) {
      setRoom(roomId)
      setProductId(id)
    } else if (findEmail === '' || typeof findEmail === 'undefined') {
      setRoom(uuidv4)
      setProductId(id)
    }
  }, [email, id, productMessages, setProductId, setRoom, user.customer_name, user.email])

  //Remove previous local storage messages
  useEffect(() => {
    localStorage.removeItem('last100MessagesLocal')
    localStorage.removeItem('localId')
    localStorage.removeItem('localProductId')
    setMessagesReceived([])
  }, [setMessagesReceived])

  //prevents submit button from working if useremail matches the product email
  const disableButton = (event) => {
    event.currentTarget.disabled = true;
    event.preventDefault();
  }

  //when message seller button clicked navigate to chat and join room
  const joinRoom = (event) => {
    socket.emit('join_room', { username, room, email });
    navigate('/chat', { replace: true });
    event.preventDefault();
  };

  //if no product to display, loading wheel will be displayed on screen.
  if (product.length === 0) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    )
  }

  return (
    <section className='product'>

      <img className="product-details__image" alt={'Mosaic bike for sale'} src={product.image_path}></img>

      <div className='product-details'>
        <div >
          <h2 className='product-details__title'>{product.item_name} </h2>
          <div className='product-details__container'>
            <CgNametag className="product-details__logo" />
            <p className='product-details__location'>  {product.user_name} </p>
          </div>
          <div className='product-details__container'>
            <ImLocation2 className="product-details__logo" />
            <p className='product-details__location'>  Toronto </p>
          </div>
          <div className='product-details__container'>
            <ImPriceTags className="product-details__logo" />
            <p className='product-details__price'>{product.price}</p>
          </div>

          <div className='product-details__container-description'>
            <TbFileDescription className="product-details__logo-description" />
            <p className='product-details__description'>{product.description}</p>
          </div>
        </div>

        <div className='message'>
          <div className='message__container'>
            <GrContact className='message__icon' />
            <p className='message__title'>Send seller a message</p>
          </div>

          {email === product.user_email ?
            <form onSubmit={disableButton}>
              <ButtonPrimary style={{ width: '95%', backgroundColor: "#323232", color: "#FAFAFA", cursor: "not-allowed" }} >
                Message Seller
              </ButtonPrimary>
            </form> :
            <form onSubmit={joinRoom}>
              <ButtonPrimary type='submit' style={{ width: '95%' }} >
                Message Seller
              </ButtonPrimary>
            </form>}
          <p className='message__sent'>{confirmationMessage}</p>

        </div>
      </div>
    </section>
  );
}

export default ProductDetails;