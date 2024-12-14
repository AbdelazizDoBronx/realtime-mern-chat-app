import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import { toast } from 'react-hot-toast'; // Import the toast function


export const useChatStore = create((set)=>({
    users : [],
    messages : [],
    selectedUser : null,
    isUserLoading : false,
    isChatLoading : false,



    getUsers : async () => {
        set({isUserLoading:true})
        try {
            const res = await axiosInstance.get('/messages/users');
            set({users:res.data});
        } catch (error) {
            toast.error('something wrong happen!couldent fetch users!')
        } finally {
            set({isUserLoading:false})
        }
    },

    getChat : async (id) => {
        set({isChatLoading : true});
        try {
            const res = await axiosInstance.get(`/messages/chat/${id}`);
            set({messages:res.data});
        } catch (error) {
            toast.error('something went wrong.couldnt fetch chats!')
        } finally {
            set({isChatLoading:false});
        }
    },
    selectedUser : (selecteduser) => {
        set({selectedUser:selecteduser})
    }
}))