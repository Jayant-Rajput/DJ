import { useState } from "react";
import { useChatStore } from "../stores/useChatStore.js";
import { useAuthStore } from "../stores/useAuthStore.js"; 
import { Send } from "lucide-react";

const MessageInput = () => {
    
    const { authUser } = useAuthStore();
    const [text,setText] = useState("");
    const { sendMessage } = useChatStore();

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if(!text.trim()) return;

        try{
            await sendMessage({ text });
            setText("");
        }catch(error){
            console.log("Failed to send message: ", error);
        }
    }

    return (
        <div className="p-4 w-full">
    
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                placeholder="Type a message..."
                value={text}
                disabled={authUser===null ? true : false }
                onChange={(e) => setText(e.target.value)}   
              />
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-circle"
              disabled={!text.trim()}
            >
              <Send size={22} />
            </button>
          </form>
        </div>
      );
}

export default MessageInput