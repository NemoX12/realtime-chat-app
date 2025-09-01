/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import toast from "react-hot-toast";
import AxiosInstance from "../lib/axiosInstance.ts";
import type User from "../lib/schemas/userSchema.ts";

interface ChatProps {
  selectedChat: User | null;
  isSendingMessage: boolean;
  selectChat: (data: any) => void;
  sendMessage: (data: any) => Promise<void>;
}

export const useChatStore = create<ChatProps>((set) => ({
  selectedChat: null,

  isSendingMessage: false,

  selectChat: async (data) => {
    set({ selectedChat: data });
  },

  sendMessage: async (data: any) => {
    set({ isSendingMessage: true });

    try {
      await AxiosInstance.post("/messages/send-message", data);
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    } finally {
      set({ isSendingMessage: false });
    }
  },
}));
