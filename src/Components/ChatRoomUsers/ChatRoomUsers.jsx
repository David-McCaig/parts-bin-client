import { useState, useEffect, useContext } from 'react';
import ChatContext from '../../Contexts/ChatContext';
import { Spin } from 'antd';
import './ChatRoomUsers.scss';
import axios from 'axios';

const RoomAndUsers = () => {

  const { socket, productId, messagesRecieved } = useContext(ChatContext);

  const [roomUsers, setRoomUsers] = useState([]);
  const [product, setProduct] = useState([]);

  const [id] = messagesRecieved.map(msg => msg.product_id);
  //get productId from local storage and store in variables
  const localId = localStorage.getItem('localId');
  const localProductId = localStorage.getItem('localProductId');

  //store productId in local storage for get request below
  useEffect(() => {
    if (id || productId) {
      localStorage.setItem('localId', id);
      localStorage.setItem('localProductId', productId);
    }
  }, [id, productId])

  //get product info associated with chat.
  useEffect(() => {
    axios
      .get(`http://localhost:8000/product/${id || productId || localProductId || localId}`)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id, localId, localProductId, productId]);

  //socket to to chatroom user info
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
        <img className="chat-details__image" alt={'Mosaic bike for sale'} src={product.image_path}></img>
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