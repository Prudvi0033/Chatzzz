import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogging: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            set({ authUser: response.data });
        } catch (error) {
            console.log("Error in checking Auth:", error);
            set({ authUser: null });
        }
        set({ isCheckingAuth: false });
    },

    signup: async (data) => {
        set({ isSigningUp: true });

        console.log("Received signup data:", data);

        try {
            const response = await axiosInstance.post("/auth/signup", data);

            console.log("Signup response:", response.data);
            set({ authUser: response.data });

            toast.success("Account Created Successfully");
        } catch (error) {
            console.error("Signup error:", error?.response?.data || error.message || error);

            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        }

        set({ isSigningUp: false });
    },


    login: async (data) => {
        set({ isLogging: true });
        try {
            const response = await axiosInstance.post("/auth/login", data);
            set({ authUser: response.data });
            toast.success("Logged in successfully");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Invalid credentials";
            toast.error(errorMessage);
        }
        set({ isLogging: false });
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Failed to logout. Please try again.");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/edit-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message || "Error in updating profile");
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
    

}));
