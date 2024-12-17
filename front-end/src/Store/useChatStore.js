import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import { toast } from 'react-hot-toast'; // Import the toast function
import {useAuthStore} from './useAuthStore'

export const useChatStore = create((set,get)=>({
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

    getMessages : async (id) => {
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
    setSelectedUser : (selecteduser) => {
        set({selectedUser:selecteduser})
    },

    sendMessage : async (data) => {
        const {selectedUser,messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,data);
            set({messages : [...messages,res.data]});
        } catch (error) {
            toast.error('something wrong happen.couldnt send message!');
        }
    },

    subscribeToMessages : ()=>{
        const {selectedUser} = get();
        const soket = useAuthStore.getState().socket;
        if(!selectedUser) return;
        soket.on('newMessage',(newMessage)=>{
            if(selectedUser._id !== newMessage.senderId) return;
            set({messages:[...get().messages,newMessage]})
        })
    },

    unSubscribeToMessage : ()=>{
        const soket = useAuthStore.getState().socket;
        soket.off('newMessage')
    }
}))