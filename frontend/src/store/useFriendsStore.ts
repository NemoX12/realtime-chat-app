/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import toast from "react-hot-toast";
import AxiosInstance from "../lib/axiosInstance.ts";
import type User from "../lib/schemas/userSchema.ts";

interface FriendsProps {
  friends: User[] | null;
  isGettingFriends: boolean;
  isSendingFriendRequest: boolean;
  getFriends: () => Promise<void>;
  // sendRequest: (data: any) => Promise<void>;
}

export const useFriendsStore = create<FriendsProps>((set) => ({
  friends: null,
  isGettingFriends: false,
  isSendingFriendRequest: false,

  getFriends: async () => {
    set({ isGettingFriends: true });

    try {
      const response = await AxiosInstance.get("/friends/friends");
      set({ friends: response.data });
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    } finally {
      set({ isGettingFriends: false });
    }
  },

  /* sendRequest: async (data) => {
    set({ isSendingFriendRequest: true });

    try {
      //   const response = await AxiosInstance.post("/friends/send-request", data);
      //   TODO: finish sending request
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    } finally {
      set({ isSendingFriendRequest: false });
    }
  }, */
}));
