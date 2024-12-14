import React, { useEffect } from 'react';
import { useAuthStore } from '../Store/useAuthStore'; 
import { Link } from 'react-router-dom';  // Assuming you are using react-router for navigation
import { useChatStore } from '../store/useChatStore';

const Sidebar = () => {
  const { authUser } = useAuthStore();  // Assuming you have all users in your store
  const {getUsers,users,selectedUser} = useChatStore();


  useEffect(()=>{getUsers()},[getUsers])
  return (
    <div className="h-screen w-64 p-3 bg-gray-800 text-white shadow-md">
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-center border-b border-gray-700">
        <img
          src={authUser?.profilePic || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{authUser?.fullName || 'User'}</h2>
          <p className="text-sm">{authUser?.email}</p>
        </div>
      </div>

      {/* User List Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold pl-6">Users</h3>
        <ul className="space-y-4 mt-4">
          {users && users.length > 0 ? (
            users.map((user) => (
              <button key={user._id}  className="flex items-center p-4 w-full hover:bg-gray-700 rounded-lg" onClick={()=>{selectedUser(user)}}>
                <img
                  src={user.profilePic || 'https://via.placeholder.com/150'}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="ml-4">{user.fullName}</span>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-400">No users found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
