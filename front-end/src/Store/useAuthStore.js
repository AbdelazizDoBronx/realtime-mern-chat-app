import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast'; // Import the toast function

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningInUp: false,
  isLogining: false,
  isUpdatingProfile: false,

  // Check Authentication status
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
      toast.success('Authentication checked successfully!'); // Success toast
    } catch (error) {
      set({ authUser: null });
      console.error('checkAuth error', error);
      toast.error('Failed to check authentication. Please log in again.'); // Error toast
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Sign up action
  signUp: async (data) => {
    set({ isSigningInUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data });
      toast.success('Sign-up successful! Welcome aboard!'); // Success toast
    } catch (error) {
      console.error('signUp error', error);
      toast.error('Sign-up failed. Please try again.'); // Error toast
    } finally {
      set({ isSigningInUp: false });
    }
  },

  logOut: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed.');
    }
  },

  logIn: async (data) => {
    set({ isLogining: true });
    try {
      const res = await axiosInstance.post('auth/login', data);
      set({ authUser: res.data });
      toast.success('Logged in successfully! Welcome Back!');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      set({ isLogining: false });
    }
  },

  profileUpdating: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error('something wrong happen!');
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
