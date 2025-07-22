import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
