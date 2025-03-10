import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import io from "socket.io-client";

const BASE_URL = "http://localhost:5001"

export const useAuthStore = create( (set,get) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,
    onlineUserCount: 0,
    socket: null,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try{
            const res = await axiosInstance.get("/auth/check");
            console.log(res);
            set({ authUser: res.data });
            get().connectSocket();
        }catch(error){
            console.log("Error in checkAuth: ",error);
            set({ authUser: null });
        }finally{
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigninUp: true });
        try{
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account Created Successfully")
            get().connectSocket();
        }catch(error){
            set({ authUser: null});
            toast.error(error.response.data.message);
            console.log("Error in signup: ", signup);
        }finally{
            set({ isSigninUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try{
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data});
            console.log(get().authUser);
            toast.success("Logged in Successfully")
            get().connectSocket();
        }catch(error){
            set({ authUser: null});
            console.log("Error in login: ", error);
            toast.error(error.response.data.message);
        }finally{
            set({ isLoggingIn: false});
        }
    },

    logout: async () => {
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged Out Successfully");
            get().disconnectSocket();   
        }catch(error){
            toast.error(error.response.data.message);
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL);
        socket.connect();

        set({socket: socket});

        socket.on("getOnlineUserCount", (cnt) => {
            set({onlineUserCount: cnt});
        })
    },

    disconnectSocket: () => {
        if(get().socket?.connected) get().socket().disconnect();
    }

}));

