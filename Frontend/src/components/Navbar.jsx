import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white fixed top-4 left-4 right-4 rounded-lg shadow-lg z-50 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-xl hover:text-green-200 transition">
          Eventify
        </Link>

        
        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-green-200 transition font-medium">
                Dashboard
              </Link>
              <Link to="/create-event" className="hover:text-green-200 transition font-medium">
                Create Event
              </Link>
              <button
                onClick={logout}
                className="bg-green-500 hover:bg-green-400 px-3 py-1 rounded transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-200 transition font-medium">
                Login
              </Link>
              <Link to="/signup" className="bg-green-500 hover:bg-green-400 px-3 py-1 rounded transition font-medium">
                Signup
              </Link>
            </>
          )}
        </div>

      
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={25} /> : <HiMenu size={25} />}
          </button>
        </div>
      </div>

    
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2">
          {user ? (
            <>
              <Link onClick={() => setIsOpen(false)} to="/dashboard" className="hover:text-green-200 transition font-medium">
                Dashboard
              </Link>
              <Link onClick={() => setIsOpen(false)} to="/create-event" className="hover:text-green-200 transition font-medium">
                Create Event
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="bg-green-500 hover:bg-green-400 px-3 py-1 rounded transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link onClick={() => setIsOpen(false)} to="/login" className="hover:text-green-200 transition font-medium">
                Login
              </Link>
              <Link onClick={() => setIsOpen(false)} to="/signup" className="bg-green-500 hover:bg-green-400 px-3 py-1 rounded transition font-medium">
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
