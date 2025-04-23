// src/components/ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />; // Redirect to home or unauthorized page
  }

  return children;
};

export default ProtectedRoute;