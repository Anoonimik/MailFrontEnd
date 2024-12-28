import { Routes, Route } from "react-router-dom";
import Login from "./pages/login-page/sign-in/SignIn.tsx";
import HomePage from "./pages/home-page/HomePage.tsx";
import SignUp from "./pages/refister-page/sign-up/SignUp.tsx";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<h1>Страница не найдена</h1>} />
    </Routes>
  );
};

export default AppRouter;
