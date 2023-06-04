import './ChatMessages.scss';
import { useContext } from 'react';
import ChatContext from '../../Contexts/ChatContext';
import AuthContext from '../../Contexts/AuthContext'
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef } from 'react';


function ChatMessages() {

  const { messagesRecieved } = useContext(ChatContext);
  const { user } = useContext(AuthContext)

  const messagesColumnRef = useRef(null)

  //scroll to bottom when new message 
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  const selected = (msg) => {
    if(user.customer_name === msg.user_name) {
      return '--selected';
    } else if (user.customer_name === msg.username) {
      return '--selected';
    } else {
      return '';
    }
  }

  //shows user messages
  return (
    <div className='chat-message' ref={messagesColumnRef}>
      {messagesRecieved.map((msg) => (
        //Conditional to add a classname to user_name in index 0
        <div className={`chat-message__container${selected(msg)}`} key={msg.id || uuidv4()}>
          <p className={`chat-message__message `}> {msg.message} </p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages