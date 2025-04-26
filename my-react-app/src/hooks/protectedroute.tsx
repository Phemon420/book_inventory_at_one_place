import { Navigate } from "react-router-dom";
import { getUserInfoFromToken } from "../utils/token";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = getUserInfoFromToken();

  console.log("User from token:", user); // <-- ✅ Add this to log user

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;