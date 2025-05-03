import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../stores/useChatStore.js'
import { useAuthStore } from '../stores/useAuthStore.js'
import { formatMessageTime, formatMessageDate } from '../lib/utils.js'
import MessageInput from './MessageInput.jsx';
import ChatSkeleton from '../skeleton-screen/ChatSkeleton.jsx';

const ChatPage = () => {
  const { isMessagesLoading, messages, getMessages, subscribeToMessage, unsubscribeToMessage, unreadMessages } = useChatStore();
  const { authUser, checkAuth, onlineUserCount } = useAuthStore();
  const messageEndRef = useRef(null);
  useEffect(() => {
    const fetchMessages = async () => {
      await getMessages();
    }
    fetchMessages();
  }, []);
  useEffect(() => {
    subscribeToMessage();
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    return () => unsubscribeToMessage();
  }, [messages]);
  
  if (isMessagesLoading) {
    return <ChatSkeleton />;
  }
  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = formatMessageDate(message.createdAt)
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  }

  console.log(unreadMessages);

  const validMessages = messages.filter((eachmsg) => eachmsg.senderId !== null);
  const messagesByDate = groupMessagesByDate(validMessages);
  const dates = Object.keys(messagesByDate);
  return (
    <div>
      <div className="bg-blue-100 p-3 rounded-lg shadow-sm mb-4 flex items-center justify-center text-blue-800 font-medium">
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        <span>{`Online users: ${onlineUserCount}`}</span>
      </div>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {dates.map((date) => (
          <div key={date}>
            <div className="text-center my-4 relative">
              <div className="border-t border-gray-300 absolute w-full top-1/2"></div>
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 relative inline-block shadow-sm border border-gray-200">
                {date}
              </span>
            </div>
            {messagesByDate[date].map((eachmsg) => (
              <div
                key={eachmsg._id}
                className={`chat ${eachmsg.senderId._id === (authUser._id) ? "chat-end" : "chat-start"}`}
                ref={messageEndRef}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src="/avatar.png"
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  {eachmsg.senderId.fullname}
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(eachmsg.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {eachmsg.image && (
                    <img
                      src={eachmsg.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {eachmsg.text && <p>{eachmsg.text}</p>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  )
}
export default ChatPage