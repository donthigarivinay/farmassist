import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get authentication state and role from Redux
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("role:", role);

  
  const handleLogout = () => {
    // Remove auth data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAuthenticated");

    console.log("Logout button clicked"); // Debug
    dispatch(logout());
    // Dispatch logout action to reset Redux state
    // dispatch({ type: "LOGOUT" });

    // Redirect to login page
    navigate("/login");
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    // Navigate to the appropriate profile page based on the user's role
    switch (role) {
      case "farmer":
        navigate("/farmer-profile");
        break;
      case "dealer":
        navigate("/dealer-profile");
        break;
      case "delivery_agent":
        navigate("/delivery-agent-profile");
        break;
      default:
        navigate("/login"); // Redirect to login if role is not recognized
    }
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-blue-600 p-4 border-4 border-white border-solid rounded-xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center ml-[-10px]">
          <img
            src="https://previews.123rf.com/images/addadavijayakumar/addadavijayakumar2001/addadavijayakumar200100014/140314214-indian-farmer-at-green-field.jpg"
            alt="FarmAssist Logo"
            className="h-12 w-12 mr-2 rounded-full"
          />
          <span className="text-earthyBlack text-2xl font-bold">FarmAssist</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-earthyBlack hover:text-earthyYellow transition duration-300">
            Home
          </Link>
          <Link to="/products" className="text-earthyBlack hover:text-earthyYellow transition duration-300">
            Products
          </Link>
          <Link to="/cart" className="text-earthyBlack hover:text-earthyYellow transition duration-300">
            Cart
          </Link>
          <Link to="/nearest-stores" className="text-earthyBlack hover:text-earthyYellow transition duration-300">
            Find Stores
          </Link>

          {/* Profile Link */}
          {isAuthenticated && (
            <button
              onClick={handleProfileClick}
              className="text-earthyBlack hover:text-earthyYellow transition duration-300"
            >
              Profile
            </button>
          )}

          {/* Logout Button */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-earthyBlack hover:text-earthyYellow transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-earthyBlack hover:text-earthyYellow transition duration-300">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;