import { Navigate, Outlet } from "react-router-dom";
import Header from "./header";
import { useAuth } from "@/contexts/AuthProvider";

const ProtectedUserRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (isAdmin) return <Navigate to="/dashboard/insights" />;
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedUserRoutes;
