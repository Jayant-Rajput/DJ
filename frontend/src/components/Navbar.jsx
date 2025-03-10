import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  const { authUser,logOut } = useAuthStore();

  const handleLogOut = () => {
    logOut(navigate);
  };


  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <div className="flex space-x-4">
        
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {!authUser && <Link to="/signup" className="hover:text-gray-300">Signup</Link>}
          {!authUser && <Link to="/login" className="hover:text-gray-300">Login</Link>}
          {authUser && <Link to="/profile" className="hover:text-gray-300">Profile</Link>}
          {authUser && <Link to="/login" onClick={handleLogOut}>Logout</Link>}
          <Link to="/checkpage" className="hover:text-gray-300">Check</Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
