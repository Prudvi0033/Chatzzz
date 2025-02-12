import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const response = await axiosInstance.get("/msg/users")
            set({ users: response.data.users })
        } catch (error) {
            console.log("Error in getting Users", error);
            toast.error("Error in getting Users")
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/msg/${userId}`);
            const newMessages = response.data.messages || [];

            set({ messages: Array.isArray(newMessages) ? newMessages : [] });
        } catch (error) {
            console.log("Error in getting Messages", error);
            toast.error("Error in getting Messages");
            set({ messages: [] });
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const messagesArray = Array.isArray(messages) ? messages : []; // Ensure messages is an array

        try {
            const res = await axiosInstance.post(`/msg/send/${selectedUser._id}`, messageData);
            const newMessage = res.data.newMessage || res.data; // Extract newMessage if wrapped

            if (newMessage && newMessage._id) {
                set({ messages: [...messagesArray, newMessage] });
            } else {
                console.error("Invalid message data:", res.data);
                toast.error("Failed to send message. Invalid response from server.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(error.response?.data?.message || "Error sending message");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get()
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id
            if (isMessageSentFromSelectedUser) return;
            set({
                messages: [...get().messages, newMessage]
            })
        })

    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket
        socket.off("newMessage")
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))