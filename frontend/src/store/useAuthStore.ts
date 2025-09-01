/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance.ts";
import type User from "../lib/schemas/userSchema.ts";

interface AuthStore {
  user: User | null;
  isSigningUp: boolean;
  isSigningIn: boolean;
  isCheckingAuth: boolean;
  isUpdatingProfile: boolean;
  checkAuth: () => Promise<void>;
  signUp: (data: any) => Promise<void>;
  signIn: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  isSigningUp: false,
  isSigningIn: false,
  isCheckingAuth: false,
  isUpdatingProfile: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const response = await axiosInstance.get("/auth/check");
      set({ user: response.data });
    } catch (error: any) {
      set({ user: null });
      console.error(error.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });

    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ user: response.data });
      toast.success("Signed Up successfully!");
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  signIn: async (data) => {
    set({ isSigningIn: true });

    console.log(data);
    try {
      const response = await axiosInstance.post("/auth/signin", data);
      set({ user: response.data });
      toast.success("Signed In successfully!");
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    } finally {
      set({ isSigningIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("Successfully logged out!");
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ user: response.data });
      toast.success("Successfully updated profile!");
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
