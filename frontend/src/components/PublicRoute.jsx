import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default PublicRoute;
