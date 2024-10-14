import { Navigate, Outlet } from "react-router-dom";
import isUserAdmin from "../utils/adminUtil";

interface AdminRouteProps {
  redirectTo: string;
}

const AdminRoute = ({ redirectTo }: AdminRouteProps) => {
  const isAdmin = isUserAdmin();
  return isAdmin ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default AdminRoute;
