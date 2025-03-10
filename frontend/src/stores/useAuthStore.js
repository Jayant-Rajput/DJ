import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { getAuth, signOut } from "firebase/auth";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      fullName: null,
      email: null,
      authProvider: null,
      authUser: null,
      isSigninUp: false,
      isLoggingIn: false,
      isCheckingAuth: false,
      branch: null,
      year: null,
      college: null,
      ccId: null,
      cfId: null,
      leetid: null,

      // Your actions...
      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          console.log("checkAuth ke andar hu bhai");
          const res = await axiosInstance.get("/auth/check");
          console.log(res);
          set({ authUser: res.data });
        } catch (error) {
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data) => {
        set({ isSigninUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account Created Successfully");
        } catch (error) {
          set({ authUser: null });
          toast.error(error.response?.data?.message || "Signup failed");
          console.log("Error in signup: ", error);
        } finally {
          set({ isSigninUp: false });
        }
      },

      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          console.log(get().authUser);
          toast.success("Logged in Successfully");
        } catch (error) {
          set({ authUser: null });
          console.log("Error in login: ", error);
          toast.error(error.response?.data?.message || "Login failed");
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logOut: async (navigate) => {
        try{
          const { authProvider } = get();
          if (authProvider !== "local") {
            const auth = getAuth();
            signOut(auth)
              .then(() => {
                set({
                  fullName: null,
                  email: null,
                  authProvider: null,
                  authUser: null,
                });
                navigate("/login");
                toast.success("Logged out Successfully");
              })
              .catch((error) => {
                console.error("Error Logging out:", error);
              });
          }else{
            const res = await axiosInstance.get("/api/auth");
            set({ authUser: null });
            if(res.status===200){
              navigate("/login");
              toast.success("Logged out Successfully");
            }
          }
        }catch(error){
          console.log(error);
        }finally{

        }
      },

      oAuthLogin: async (user, navigate) => {
        set({ isLoggingIn: true });
        try {
          const response = await axiosInstance.post(
            "/auth/oauthlogin",
            {
              fullName: user.displayName,
              email: user.email,
              authProvider: "google",
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          console.log("Hola");
          if (response.status === 200) {
            console.log(response.data);
            set({ authUser: response.data });
            navigate("/");
            toast.success("Logged in successfully!");
          }
        } catch (error) {
          set({
            fullName: null,
            email: null,
            authProvider: null,
            authUser: null,
          });
          const auth = getAuth();
          signOut(auth).catch((error) => {
            console.error("Error signing out:", error);
          });
          toast.error(error.response?.data?.message || "OAuth login failed!");
        } finally {
          set({ isLoggingIn: false });
        }
      },

      oAuthSignup: async (navigate) => {
        set({ isSigninUp: true });
        try {
          console.log("Inside oAuthSignup");
          const { fullName, email, authProvider, branch, college, year, ccId, cfId, leetid } = get();
          const response = await axiosInstance.post(
            "/auth/oauthuser",
            {
              fullName,
              email,
              authProvider,
              branch,
              college,
              year,
              ccId,
              cfId,
              leetId: leetid,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.status === 200) {
            set({ authUser: response.data });
            navigate("/");
            toast.success("Account Created Successfully!");
          }
        } catch (error) {
          console.log("Error in oAuthSignup:", error);
          toast.error("OAuth signup failed!");
        } finally {
          set({ isSigninUp: false });
        }
      },

      formValues: (data) => {
        set({
          branch: data.branch,
          college: data.college,
          year: data.year,
          ccId: data.ccId,
          cfId: data.cfId,
          leetid: data.leetId,
        });
      },

      oauthData: (data) => {
        set({
          fullName: data.displayName,
          email: data.email,
          authProvider: "google",
        });
      },    
      
      loginWithOTP: async (data) => {
        set({isLoggingIn: true});
        try {
          console.log(data.OTP);
          const res = await axiosInstance.post("/auth/login-OTP", data);
          set({ authUser: res.data });
          console.log(get().authUser);
          toast.success("Logged in Successfully");
        } catch (error) {
          console.log("Error in login: ", error);
          toast.error(error.response?.data?.message || "Login failed");
        } finally{
          set({ isLoggingIn: false });
        }
      },

      generateOTP: async (data) => {
        try {
          await axiosInstance.post("/auth/gen-OTP", data);
          toast.success("OTP sent Successfully");
        } catch (error) {
          console.log("Error in Sending OTP: ", error);
          toast.error(error.response?.data?.message || "Error in generating OTP");
        }
      },

      changePassword: async (data) => {
        try {
          await axiosInstance.post("/change-password", data);
          toast.success("Password changed Successfully");
        } catch (error) {
          console.log("Error in changing Password: ", error);
          toast.error(error.response?.data?.message || "Error in changing Password");
        }
      },

      // forgetPassword: async (data) => {
      //   try {
      //     await axiosInstance.post("/forget-password", data);
      //     toast.success("Password changed Successfully");
      //   } catch (error) {
      //     console.log("Error in changing Password: ", error);
      //     toast.error(error.response?.data?.message || "Error in changing Password");
      //   }
      // }


    }),
    {
      name: "auth-store", // Unique name for localStorage key
    }
  )
);
