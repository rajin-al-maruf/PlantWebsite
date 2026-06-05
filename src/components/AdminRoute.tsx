import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { toast } from "sonner";
import { useAuth } from "../AuthContext";
import { useEffect } from "react";

const AdminRoute = () => {
  const { user, loading } = useAuth();
  const adminEmails = ["rajinalmarufananda@gmail.com"];

  useEffect(() => {
    if (!loading && (!user || !user.email || !adminEmails.includes(user.email))) {
      toast.error("Unauthorized: Admin access required.");
    }
  }, [user, loading]);

  if (loading) return <Spinner />;

  if (user && user.email && adminEmails.includes(user.email)) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;