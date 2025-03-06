import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create( (set,get) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try{
            console.log("checkAuth ke andar hu bhai")
            const res = await axiosInstance.get("/auth/check");
            console.log(res);
            set({ authUser: res.data });
        
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
        }catch(error){
            set({ authUser: null});
            console.log("Error in login: ", error);
            toast.error(error.response.data.message);
        }finally{
            set({ isLoggingIn: false});
        }
    },
})) 

