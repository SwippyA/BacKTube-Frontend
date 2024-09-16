import React from "react";
import { FaUser, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/Reducer/Login";

function Header() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-black text-white px-6 shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <img
            src="./src/assets/WhatsApp Image 2024-07-26 at 22.45.12_62c7bdd8.jpg"
            alt="Logo"
            className="w-16 h-16"
          />
          <span className="ml-2 text-3xl relative right-5">Backtube</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-lg border-gray-300 focus:outline-none text-black font-bold focus:bg-purple-200"
          />
        </div>

        {/* Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 text-white hover:text-purple-300"
          >
            <FaUser size={20} />
            <span>Profile</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-purple-400 text-black border border-gray-300 rounded-lg shadow-lg z-60">
              <ul>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        to="/editProfile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <a
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          handleLogout();
                        }}
                        href="#logout"
                        className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      to={"/login"}
                      className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                    >
                      <FaSignInAlt className="mr-2" /> Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
