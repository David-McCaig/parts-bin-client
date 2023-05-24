import './ChatDashboardPage.scss';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import AuthContext from '../../Contexts/AuthContext';
import ChatContext from '../../Contexts/ChatContext';
import { Spin } from 'antd';
import ChatDashboardBuyList from '../../Components/ChatDashboard/ChatDashboardBuyList';
import ChatDashboardSellList from '../../Components/ChatDashboard/ChatDashboardSellList';
import { BsFillEnvelopeOpenFill } from "react-icons/bs";

function ChatDashboard() {

  const { user } = useContext(AuthContext);
  const { setBuyMessages, setSellMessages, buyMessages, sellMessages } = useContext(ChatContext);
  //signed in users email
  const email = user.email;

  //get first message of each chatroom for items that user is selling
  useEffect(() => {
    axios
      .get(`http://localhost:8000/chat/buy/${email}`)
      .then((res) => {
        setBuyMessages(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [email, setBuyMessages])

  //get first message of each chatroom for items that user is buying
  useEffect(() => {
    axios
      .get(`http://localhost:8000/chat/sell/${email}`)
      .then((res) => {
        setSellMessages(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [email, setSellMessages])

  //if no user loading screen
  if (!user) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    )
  }
return (
  <section className='chat-dashboard'>
    <div className='chat-dashboard__container'>
      <h1 className='chat-dashboard__title'>My Messages</h1>
      {buyMessages.length === 0 && sellMessages.length === 0 ? (
        <>
          <p className='chat-dashboard__text'>Your inbox is empty</p>
          <BsFillEnvelopeOpenFill className='chat-dashboard__empty' />
        </>
      ) : (
        <>
          <ChatDashboardBuyList />
          <ChatDashboardSellList />
        </>
      )}
    </div>
  </section>
);
}

export default ChatDashboard