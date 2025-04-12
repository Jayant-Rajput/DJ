import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";


export const useChatStore = create( (set, get) => ({
    messages: [],
    isMessagesLoading: false,

    getMessages: async () => {
        set({isMessagesLoading: true});
        try{
            const response = await axiosInstance.get("/messages");
            set({messages: response.data});
        }catch(error){
            toast.error(error.response.data.messages);
        }finally{
            set({isMessagesLoading: false});
        }
    },

    sendMessage: async (msgData) => {
        const {messages} = get();
        try{
            console.log("hola", msgData);
            const response = await axiosInstance.post("/messages/send", msgData);
            console.log("Response: ", response);
            set({messages: [...messages, response.data] });
        }catch(error){
            toast.error(error.response.data.messages);
        }
    },

    subscribeToMessage: () => {
        const socket = useAuthStore.getState().socket;
        const authUser = useAuthStore.getState().authUser;

        socket.on("newMessage",(newMessage) => {
            const isMessageSentFromOther = newMessage.senderId._id !== authUser._id;
            if(!isMessageSentFromOther) return;

            set({
                messages: [...get().messages, newMessage]
            });
        });
    },

    unsubscribeToMessage: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
}))