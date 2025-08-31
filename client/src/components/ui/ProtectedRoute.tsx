import { useAuth } from "@/contexts/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ admin }: { admin: boolean }) => {
  const { isAdmin, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (admin) {
    if (!isAdmin) return <Navigate to="/events" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
