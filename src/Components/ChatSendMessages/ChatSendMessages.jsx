import './ChatSendMessages.scss';
import { useContext, useState, useEffect } from 'react';
import ChatContext from '../../Contexts/ChatContext';
import AuthContext from '../../Contexts/AuthContext';
import { Spin } from 'antd';
import axios from 'axios';
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons'
const { TextArea } = Input;

function ChatSendMessages() {

  const { REACT_APP_API_URL } = process.env;

  const { socket, room, setRoom, productId, messagesRecieved } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const [message, setMessage] = useState('');

  // Add a check to ensure that the "customer_name" property exists on the "user" object
  const [id] = messagesRecieved.map(msg => msg.product_id);
  const username = user.customer_name ? user.customer_name : '';
  const email = user.email ? user.email : '';

  useEffect(() => {
    localStorage.setItem('last100MessagesLocal', JSON.stringify(messagesRecieved))
  },[messagesRecieved])

  const sendMessage = () => {
    // if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server. 
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
      axios.post(`${REACT_APP_API_URL}/chat`, {
        'user_name': username,
        'message': message,
        'room': room,
        'email': email,
        'product_id': id || productId
      })
        .then(() => {
        
        })
        .catch((err) => {
          console.log(err);
        });
    // }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the newline character from being added
      sendMessage(); // Submit the form
    }
  };
  //Conditional to check if room is an empty string. If empty setRoom to appropriate room. This is used for when navigating from the ChatDashboard page.
  useEffect(() => {
    const dashboardRoom = messagesRecieved.map(msg => msg.room)[0];
    if (!room) {
      setRoom(dashboardRoom);
    }
  }, [messagesRecieved, room, setRoom]);

  // Add a check to ensure that the "user" object is not null
  if (!messagesRecieved) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    )
  }

  return (
    <div className='chat-send' >

      <div className='chat-send__container'>
        <TextArea
          value={message}
          onKeyDown={handleKeyDown} // Add the onKeyDown event handler
          onChange={(e) => setMessage(e.target.value)}
          bordered={false}
          placeholder="Type a message..."
          autoSize={{ minRows: 3, maxRows: 5 }}
          size='large'
        />
        <button className='chat-send__button' onClick={sendMessage}>
          <SendOutlined />
        </button>
      </div>

    </div>
  );
}

export default ChatSendMessages