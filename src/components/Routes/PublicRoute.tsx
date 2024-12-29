import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { selectIsAuthenticated } from "../../store/slices/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
export const PublicRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    // Если пользователь авторизован и пытается зайти на публичные страницы (login/register),
    // перенаправляем его на домашнюю страницу или на страницу, с которой он пришёл
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
