import { useEffect, useState, createContext } from 'react';
import io from 'socket.io-client';

const ChatContext = createContext({});

//socket will run on port 8000
const socket = io.connect('http://localhost:8000');

export const ChatProvider = ({ children }) => {

  const [room, setRoom] = useState('');
  const [productId, setProductId] = useState('')
  const [buyMessages, setBuyMessages] = useState([]);
  const [sellMessages, setSellMessages] = useState([]);
  const [messagesRecieved, setMessagesReceived] = useState([]);
 
  // Runs whenever a socket event is recieved from the server.
  useEffect(() => {
    socket.on('receive_message', (data) => {
      
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
          product_id: data.product_id,
        },
      ]);
      
    });
    // Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [room]);
  
  //updates messagesRecieved through local storage
  const recieveLocalMessage = () => {
    const newMessage = localStorage.getItem('last100MessagesLocal');
    const newMessageArray = JSON.parse(newMessage)
    setMessagesReceived(newMessageArray);
  }

  //gets last 100messages. Also stores messages in local storage.
  useEffect(() => {
    socket.on('last_100_messages', (last100Messages) => {
      last100Messages = JSON.parse(last100Messages);
      last100Messages = sortMessagesByDate(last100Messages);
  
      if (last100Messages.length > 0) {
        // Store last100Messages in local storage
        localStorage.setItem('last100MessagesLocal', JSON.stringify(last100Messages));
        setMessagesReceived(last100Messages);
      } 
    });
    return () => {
      socket.off('last_100_messages');
    };
  }, [room]);
  
//If socket disconnects gets messages from local storage and updates messagesRecieved state
  useEffect(() => {
    if (messagesRecieved.length === 0) {
      // Retrieve messages from local storage and use them
      const storedMessages = localStorage.getItem('last100MessagesLocal');
      if (storedMessages) {
        const storedMessagesArray = JSON.parse(storedMessages);
        setMessagesReceived(storedMessagesArray);
      }
    }
  }, [messagesRecieved.length])

  //sort messages by date
  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  // dd/mm/yyyy, hh:mm:ss
  const formatDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <ChatContext.Provider value={{
      socket,
      room,
      messagesRecieved,
      setMessagesReceived,
      formatDateFromTimestamp,
      setRoom,
      setProductId,
      productId,
      sellMessages,
      setSellMessages,
      buyMessages,
      setBuyMessages,
      recieveLocalMessage
    }}>

      {children}

    </ChatContext.Provider>
  )
}

export default ChatContext;

