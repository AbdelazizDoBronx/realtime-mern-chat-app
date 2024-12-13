import React from 'react';
import { User, Settings, LogOut } from 'lucide-react';  // Importing icons from lucide-react (you can choose your preferred icons)
import { useAuthStore } from '../Store/useAuthStore';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const {logOut,authUser} = useAuthStore();  
 
  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center shadow-md">
      {/* Left side - Logo */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold">
          <Link to='/'><img src='/logo.svg' alt='logo' className='cursor-pointer'/></Link>
        </div>
      </div>

      {/* Right side - Settings, Profile, and Logout */}
      <div className="flex items-center space-x-6">
        {/* Settings Icon */}
        <div className="cursor-pointer">
          <Settings size={24} />
        </div>

        {/* Profile Avatar */}
        <div className="relative">
          {authUser&&<div className="flex items-center space-x-2 cursor-pointer">
            <User size={24} />
          </div>}

          {/* Profile dropdown (hidden by default) */}
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg hidden group-hover:block">
            <div className="p-2 cursor-pointer hover:bg-gray-100">Profile</div>
            <div className="p-2 cursor-pointer hover:bg-gray-100">Settings</div>
            <div className="p-2 cursor-pointer hover:bg-gray-100 text-red-600" onClick={() => alert('Logging out...')}>Log Out</div>
          </div>
        </div>
        
        {/* Logout Icon */}
        {authUser&&<div className="cursor-pointer" onClick={() => logOut()}>
          <LogOut size={24} />
        </div>}
      </div>
    </nav>
  );
};

export default Navbar;
