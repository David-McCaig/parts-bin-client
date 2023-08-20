import { useContext } from 'react'
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { Link } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext'
import ChatContext from '../../Contexts/ChatContext';
import ChatMessages from '../../Components/ChatMessages/ChatMessages';
import ChatSendMessages from '../../Components/ChatSendMessages/ChatSendMessages';
import ChatRoomUsers from '../../Components/ChatRoomUsers/ChatRoomUsers';
import './ChatPage.scss';
import { Spin } from 'antd';

function Chat() {

  const { user } = useContext(AuthContext);
  const { messagesRecieved } = useContext(ChatContext);
  //Scroll to top on first render.
  useScrollToTop();

  //if no user loading
  if (!user) {
    return (
      <main className="dashboard">
        <p>
          You must be logged in to see this page.{' '}
          <Link to='/login'>Log in</Link>
        </p>
      </main>
    );
  }

  if (!messagesRecieved) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    )
  }

  return (
    <div className='chat'>
      <div className='chat__container'>
        <ChatRoomUsers />
        <ChatMessages />
        <ChatSendMessages />
      </div>
    </div>
  )
}

export default Chat