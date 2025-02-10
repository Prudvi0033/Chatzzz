import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get)=>({
    messages : [],
    users : [],
    selectedUser : null,
    isUsersLoading : false,
    isMessagesLoading : false,

    getUsers : async () => {
        set({isUsersLoading : true})
        try {
            const response = await axiosInstance.get("/msg/users")
            set({users : response.data.users})
        } catch (error) {
            console.log("Error in getting Users",error);
            toast.error("Error in getting Users")
        } finally{
            set({isUsersLoading : false})
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/msg/${userId}`);
            console.log("Full API Response:", response);
    
            const newMessages = response.data.messages || [];
            console.log("Extracted messages:", newMessages);
    
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
        const { selectedUser, messages } = get()
        
        const messagesArray = Array.isArray(messages) ? messages : []
    
        try {
            const response = await axiosInstance.post(`/msg/send/${selectedUser._id}`, messageData)
            set({ messages: [...messagesArray, response.data] }) // ✅ Safe spread
        } catch (error) {
            console.log("Error in sending messages", error)
            toast.error("Error in sending messages")
        }
    },

    setSelectedUser : (selectedUser) => set({selectedUser}), 
}))