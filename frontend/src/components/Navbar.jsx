import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

const Navbar = () => {
  const navigate = useNavigate();
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
