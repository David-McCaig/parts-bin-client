import './ChatDashboard.scss'
import { useContext } from 'react';
import ChatContext from '../../Contexts/ChatContext';
import AuthContext from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useEffect } from 'react';

function ChatDashboard({ image, itemName, message, userName, room, createdAt, product_id }) {

  const navigate = useNavigate();

  const { socket, setProductId } = useContext(ChatContext);

  const { user } = useContext(AuthContext);

  //get signed in users name and email
  const username = user.customer_name ? user.customer_name : '';
  const email = user.email ? user.email : '';

  //Remove previous local storage messages
  useEffect(() => {
    localStorage.removeItem('localProductId');
  },[]);

  //Joins chat the user selects
  const joinRoom = (e) => {
    e.preventDefault();
    setProductId(product_id)
    socket.emit('join_room', { username, room, email });
    navigate('/chat', { replace: true });
  }

  return (
    <form className='dashboard-message' onSubmit={joinRoom}>
      <button className='dashboard-message__button'>
        <img className="dashboard-message__image" alt={'Mosaic bike for sale'} src={image}></img>

        <div className="dashboard-message__container">
          <h2 className="dashboard-message__item">{itemName}</h2>
          <p className="dashboard-message__message"> {message}</p>
          <p className="dashboard-message__user">{userName}</p>
        </div>

        <div className="dashboard-message__empty"></div>
        <p className="dashboard-message__time">{createdAt}</p>
      </button>
    </form>
  )
}

export default ChatDashboard;