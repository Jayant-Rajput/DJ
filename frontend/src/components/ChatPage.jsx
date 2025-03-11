import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../stores/useChatStore.js'
import { useAuthStore } from '../stores/useAuthStore.js'

import { formatMessageTime } from '../lib/utils.js'
import MessageInput from './MessageInput.jsx';

const ChatPage = () => {
  const {isMessagesLoading, messages, getMessages, subscribeToMessage, unsubscribeToMessage} = useChatStore();
  const { authUser,checkAuth } = useAuthStore();
  // console.log(authUser);

  const messageEndRef = useRef(null);

  useEffect(()=>{
    const fetchMessages = async () => {
      await getMessages();
    }
    fetchMessages();
  },[]);

  useEffect(()=>{
    subscribeToMessage();
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    return () => unsubscribeToMessage();
  },[messages]);

  if(isMessagesLoading){
    return <h1>wait a second...Messages are loading</h1>
  }

  return (
    <div>
     <div className='flex-1 overflow-y-auto p-4 space-y-4'>
      {messages.filter((eachmsg) => eachmsg.senderId !== null)
        .map((eachmsg) => (
        <div
              key={eachmsg._id}
              className={`chat ${eachmsg.senderId._id === authUser._id ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src= "/avatar.png" /*{
                    eachmsg.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : eachmsg.senderId.profilePic || "/avatar.png"
                  } */
                  alt="profile pic" 
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              {eachmsg.senderId.fullname}
              <time className="text-xs opacity-50 ml-1">
                { formatMessageTime(eachmsg.createdAt) }
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {/*{message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )} */}
              {eachmsg.text && <p>{eachmsg.text}</p>}
            </div>
          </div>
      ))}
     </div>

     <h1>MESSAGES</h1>
     <MessageInput/>

    </div>
  )
}

export default ChatPage