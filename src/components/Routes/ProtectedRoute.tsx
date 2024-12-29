import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { selectIsAuthenticated } from "../../store/slices/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Сохраняем путь, с которого пользователя перенаправило
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
