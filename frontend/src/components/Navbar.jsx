import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogOut = () => {
    logout(navigate);
    setDropdownOpen(false);
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

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-10 bg-black bg-opacity-70 py-4 px-6 `}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="flex items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">My App</span>
          </Link>
        </h1>
        <div className="flex space-x-6 items-center">
          <Link to="/" 
                className={`hover:text-blue-400 transition-colors ${isActive('/') ? 'text-blue-400' : 'text-white'}`}>
            Home
          </Link>
          <Link to="/contest-list" 
                className={`hover:text-blue-400 transition-colors ${isActive('/contest-list') ? 'text-blue-400' : 'text-white'}`}>
            Contests
          </Link>
          <Link to="/blogs" 
                className={`hover:text-blue-400 transition-colors ${isActive('/blogs') ? 'text-blue-400' : 'text-white'}`}>
            Blogs
          </Link>
          {authUser && (
            <Link to="/createBlog" 
                  className={`hover:text-blue-400 transition-colors ${isActive('/createBlog') ? 'text-blue-400' : 'text-white'}`}>
              Create
            </Link>
          )}
          <Link to="/chat" 
                className={`hover:text-blue-400 transition-colors ${isActive('/chat') ? 'text-blue-400' : 'text-white'}`}>
            Community
          </Link>

          {!authUser ? (
            <div className="flex space-x-2 ml-2">
              <Link to="/login" className="px-4 py-2 rounded-lg text-white hover:bg-gray-800 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative profile-dropdown">
              <div 
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-400 overflow-hidden flex items-center justify-center hover:border-blue-300 transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {authUser.photoURL ? (
                  <img
                    src={authUser.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-lg font-bold">
                    {authUser.displayName ? authUser.displayName[0].toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden">
                  <div className="p-3 border-b border-gray-700">
                    <p className="text-sm font-medium text-white truncate">
                      {authUser.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {authUser.email || ''}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-white hover:bg-blue-600 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-white hover:bg-blue-600 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                      Settings
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </div>
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