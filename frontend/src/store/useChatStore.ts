/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import toast from "react-hot-toast";
import AxiosInstance from "../lib/axiosInstance.ts";
import type User from "../lib/schemas/userSchema.ts";
import type messageSchema from "../lib/schemas/messageSchema.ts";

interface ChatProps {
  selectedChat: User | null;
  selectedImage: string | null;
  messages: messageSchema[] | null;
  isSendingMessage: boolean;
  isGettingMessages: boolean;
  selectChat: (data: any) => void;
  closeChat: () => void;
  selectImage: (data: any) => void;
  closeImage: () => void;
  sendMessage: (data: any) => Promise<void>;
  getMessages: (data: any) => Promise<void>;
  deleteMessage: (data: any) => Promise<void>;
}

export const useChatStore = create<ChatProps>((set) => ({
  selectedChat: null,
  selectedImage: null,
  messages: null,
  isGettingMessages: false,
  isSendingMessage: false,

  selectChat: async (data) => {
    set({ selectedChat: data });
  },

  closeChat: () => {
    set({ selectedChat: null });
  },

  selectImage: (data) => {
    set({ selectedImage: data });
  },

  closeImage: () => {
    set({ selectedImage: null });
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

  getMessages: async (data) => {
    set({ isGettingMessages: true });

    try {
      const response = await AxiosInstance.post("/messages/get-messages", data);
      set({ messages: response.data });
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    } finally {
      set({ isGettingMessages: false });
    }
  },

  deleteMessage: async (data) => {
    try {
      await AxiosInstance.delete("/messages/delete-message", { data });
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  },
}));
