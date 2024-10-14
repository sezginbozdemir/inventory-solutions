import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenUtil";

interface ProtectedRouteProps {
  redirectTo: string;
}

const ProtectedRoute = ({ redirectTo }: ProtectedRouteProps) => {
  const isAuth = !isTokenExpired();
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
