import './ChatDashboardPage.scss';
import { useContext, useMemo } from 'react';
import { useAxiosFetch } from '../../hooks/useAxiosFetch';
import { useAxiosFetchSetState } from '../../hooks/useAxiosFetchSetState';
import AuthContext from '../../Contexts/AuthContext';
import ChatContext from '../../Contexts/ChatContext';
import { Spin } from 'antd';
import ChatDashboardBuyList from '../../Components/ChatDashboard/ChatDashboardBuyList';
import ChatDashboardSellList from '../../Components/ChatDashboard/ChatDashboardSellList';

function ChatDashboard() {

  const { REACT_APP_API_URL } = process.env

  const { user } = useContext(AuthContext);
  const { setBuyMessages, setSellMessages } = useContext(ChatContext);
  //signed in users email
  const publicId = user.public_id;

  //get first message of each chatroom for items that user is selling
  const dependencyArrayUserIsSelling = useMemo(() => [REACT_APP_API_URL, publicId, setBuyMessages], [REACT_APP_API_URL, publicId, setBuyMessages]);
  const getFirstMessageUserIsSelling = useAxiosFetch(`${REACT_APP_API_URL}/chat/buy/${publicId}`, dependencyArrayUserIsSelling);
  useAxiosFetchSetState(getFirstMessageUserIsSelling.data, setBuyMessages)

  //get first message of each chatroom for items that user is buying
  const dependencyArrayUserIsBuying = useMemo(() => [REACT_APP_API_URL, publicId, setSellMessages], [REACT_APP_API_URL, publicId, setSellMessages]);
  const getFirstMessageUserIsBuying = useAxiosFetch(`${REACT_APP_API_URL}/chat/sell/${publicId}`, dependencyArrayUserIsBuying);
  useAxiosFetchSetState(getFirstMessageUserIsBuying.data, setSellMessages)

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
        <>
          <ChatDashboardBuyList />
          <ChatDashboardSellList />
        </>
      </div>
    </section>
  );
}

export default ChatDashboard