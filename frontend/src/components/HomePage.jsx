import React, {useEffect} from 'react'
import { useChatStore } from '../stores/useChatStore';
import { useAuthStore } from '../stores/useAuthStore';

const HomePage = () => {

  const {messages, subscribeToMessage, unsubscribeToMessage} = useChatStore();
  const {authUser} = useAuthStore();

  console.log(authUser);
  
  
  useEffect(() => {
    subscribeToMessage();
    return () => unsubscribeToMessage();
  }, [messages]);

  return (
    <div>HomePage</div>
  )
}

export default HomePage