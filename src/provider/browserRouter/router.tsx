import { Routes, Route } from "react-router-dom";
import Login from "../../pages/login-page/sign-in/SignIn.tsx";
import HomePage from "../../pages/home-page/HomePage.tsx";
import SignUp from "../../pages/refister-page/sign-up/SignUp.tsx";
import { ProtectedRoute } from "../../components/Routes/ProtectedRoute.tsx";
import { PublicRoute } from "../../components/Routes/PublicRoute.tsx";

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

      {/* Маршрут для несуществующих страниц */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <h1>Страница не найдена</h1>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
