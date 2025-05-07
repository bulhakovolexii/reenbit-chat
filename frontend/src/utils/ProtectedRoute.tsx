import { Navigate, Outlet } from "react-router-dom";
import { useCheckAuthQuery } from "../redux";

export default function ProtectedRoute() {
  const { data: user, isLoading, isError } = useCheckAuthQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
