import { useState, useEffect, useContext } from 'react';
import ChatContext from '../../Contexts/ChatContext';
import { Spin } from 'antd';
import './ChatRoomUsers.scss';
import axios from 'axios';

const RoomAndUsers = () => {

  const { REACT_APP_API_URL } = process.env;

  const { socket, productId } = useContext(ChatContext);

  const [roomUsers, setRoomUsers] = useState([]);
  const [product, setProduct] = useState([]);

  //get productId from local storage and store in variables

  const localProductId = localStorage.getItem('localProductId');

  //store productId in local storage for get request below
  useEffect(() => {
    if (productId) {
      localStorage.setItem('localProductId', productId);
    }
  }, [productId])

  //get product info associated with chat.
  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/product/${productId || localProductId}`)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [REACT_APP_API_URL, localProductId, productId]);

  //socket to chatroom user info
  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      setRoomUsers(data);
    });
    return () => socket.off('chatroom_users');
  }, [socket]);

  //if no room users loading
  if (!roomUsers) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    )
  }

  return (
    <div className='chat-details' >
      <div className='chat-details'>
        <img className="chat-details__image" alt={''} src={product.image_path}></img>
        <p className='chat-details__item-name'>{product.item_name}</p>
      </div>
      <div className='chat-details__container'>
        <div className='chat-details__user-name'>
          <div className='chat-details__circle'>
            {product.user_name?.slice(0, 1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAndUsers;