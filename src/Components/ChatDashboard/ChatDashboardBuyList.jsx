import React from 'react'
import { useContext } from 'react';
import ChatContext from '../../Contexts/ChatContext';
import ChatDashboard from './ChatDashboard';
import { dateTimeAgo } from '../../utils/dateTimeago.jsx'
import { resizeImage } from '../../utils/resizeImage.jsx';

function ChatDashboardBuyList() {

  const { buyMessages } = useContext(ChatContext)
  //List of messages for ads that user is buying
  return (
    <>
      {buyMessages.map((msg) => {
        return (
          <ChatDashboard
            key={msg.room}
            room={msg.room}
            image={resizeImage(msg.image_path,'c_fill,h_150,w_150')}
            itemName={msg.item_name}
            message={msg.message}
            userName={msg.user_name}
            createdAt={dateTimeAgo(msg.created_at)}
            product_id={msg.product_id}
          />
        )
      })}
    </>
  )
}

export default ChatDashboardBuyList