import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useChatStore } from '../stores/useChatStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { unreadMessages, clearUnreadMessages } = useChatStore();
  
  const handleLogOut = () => {
    logout(navigate);
    setDropdownOpen(false);
  };
  
  const handleNotificationClick = () => {
    clearUnreadMessages(); // Assuming this function is available in useChatStore
    navigate('/chat'); // Navigate to chat page when notification is clicked
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-dropdown')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <div className="flex space-x-4 items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {!authUser && <Link to="/signup" className="hover:text-gray-300">Signup</Link>}
          {!authUser && <Link to="/login" className="hover:text-gray-300">Login</Link>}
          <Link to="/contest-list" className="hover:text-gray-300">Contest</Link>
          <Link to="/blogs" className="hover:text-gray-300">Blog</Link>
          {authUser && <Link to="/createBlog" className="hover:text-gray-300">CreateBlog</Link>}
          <Link to="/chat" className="hover:text-gray-300">Chat</Link>
          
          {/* Bell notification icon with badge */}
          {authUser && <div className="relative cursor-pointer" onClick={handleNotificationClick}>
            {/* Bell Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            
            {/* Notification Badge */}
            {unreadMessages > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadMessages > 99 ? '99+' : unreadMessages}
              </div>
            )}
          </div>}
          
          {authUser && (
            <div className="relative profile-dropdown">
              <img
                src={authUser.photoURL || "../../public/avatar.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer border-2 border-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;