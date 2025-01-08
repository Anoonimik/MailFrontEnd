import { Routes, Route } from "react-router-dom";
import Login from "../../pages/login-page/sign-in/SignIn.tsx";
import HomePage from "../../pages/home-page/HomePage.tsx";
import SignUp from "../../pages/refister-page/sign-up/SignUp.tsx";
import { ProtectedRoute } from "../../components/Routes/ProtectedRoute.tsx";
import { PublicRoute } from "../../components/Routes/PublicRoute.tsx";
import Dashboard from "../../pages/dashboard-page/Dashboard.tsx";
import EmailBotsPage from "../../pages/bots-page/EmailBotsPage.tsx";

const AppRouter = () => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      {/* Защищенные маршруты */}
      <Route path="/" element={<HomePage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/email-bots"
        element={
          <ProtectedRoute>
            <EmailBotsPage />
          </ProtectedRoute>
        }
      />
      {/* Маршрут для несуществующих страниц */}
      <Route
        path="*"
        element={
          <PublicRoute>
            <h1>Страница не найдена</h1>
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
