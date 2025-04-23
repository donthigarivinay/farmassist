// src/pages/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer", // Default role
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(register(formData));
      const user = resultAction.payload;

      if (user) {
        // Redirect based on the user's role
        switch (user.role) {
          case "farmer":
            navigate("/FarmerDashboard");
            break;
          case "dealer":
            navigate("/DealerDashboard");
            break;
          case "delivery-agent":
            navigate("/DeliveryAgentPage");
            break;
          default:
            navigate("/profile"); // Fallback for unknown roles
        }
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center pb-[100px]">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <select
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            value={formData.role}
            required
          >
            <option value="farmer">Farmer</option>
            <option value="dealer">Dealer</option>
            <option value="delivery_agent">Delivery Agent</option>
          </select>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;