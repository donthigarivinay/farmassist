// src/pages/Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap() // Handle promise resolution
      .then(() => {
        navigate("/Profile"); // Redirect only after login succeeds
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          New user?{" "}
          <Link to="/register" className="text-green-500 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;