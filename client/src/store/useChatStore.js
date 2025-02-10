import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set)=>({
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

    getMessages : async (userId) => {
        set({isMessagesLoading : true})
        try {
            const response = await axiosInstance.get(`/msg/${userId}`)
            set({messages : response.data})
        } catch (error) {
            console.log("Error in getting Messages",error);
            toast.error("Error in getting Messages")
        } finally{
            set({isMessagesLoading : false})
        }
    },

    setSelectedUser : (selectedUser) => set({selectedUser}), 
}))