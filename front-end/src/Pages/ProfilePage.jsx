import React, { useState } from 'react';
import { Edit, Lock, Calendar } from 'lucide-react';
import { useAuthStore } from '../Store/useAuthStore';

const ProfilePage = () => {
  const [profilePicture, setProfilePic] = useState(null);
  const { profileUpdating, authUser, isUpdatingProfile } = useAuthStore();

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setProfilePic(base64Image); // Update state with the new image
      await profileUpdating({ profilePic: base64Image }); // Update profile with the new image
    };
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Picture Section */}
          <div className="relative">
            <img
              src={authUser?.profilePic || profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
            <label htmlFor="profilePic" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
              <Edit size={20} />
            </label>
            <input
              id="profilePic"
              type="file"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </div>

          {/* User Info Section */}
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-gray-700">Full Name: </label>
              <input
                type="text"
                value={authUser?.fullName}
                disabled
                className="w-3/4 p-2 border bg-gray-50 rounded-md text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="font-semibold text-gray-700">Email</label>
              <input
                type="email"
                value={authUser?.email}
                disabled
                className="w-3/4 p-2 border bg-gray-50 rounded-md text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="font-semibold text-gray-700">Created At</label>
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-gray-500" />
                <span className="text-gray-600">{authUser?.createdAt}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="font-semibold text-gray-700">Status</label>
              <div className="flex items-center space-x-2">
                <span className='text-green'>Active</span>
              </div>
            </div>
          </div>
          
          {/* Show Loading State if Profile is Being Updated */}
          {isUpdatingProfile && (
            <div className="text-center text-gray-500 mt-4">Updating profile...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
