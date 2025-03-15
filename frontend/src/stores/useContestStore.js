import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useContestStore = create((set, get) => ({
  isfetchingContests: false,
  bookmarkContest: [],

  fetchContests: async () => {
    set({ isfetchingContests: true });
    try {
      const res = await axiosInstance.get("/contest/list");
      if (res.status === 200) {
        set({ allContests: res.data.contests });
        toast.success("Contest Lists fetched successfully");
        return res.data.contests;
      }
    } catch (error) {
      console.log("Error in fetching contests", error);
    } finally {
      set({ isfetchingContests: false });
    }
  },


}));
