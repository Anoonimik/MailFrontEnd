import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/sign-in-side/SignInSide";
import MarketingPage from "./pages/marketing-page/MarketingPage.tsx";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MarketingPage />} />
      <Route path="/home" element={<MarketingPage />} />
      <Route path="*" element={<h1>Страница не найдена</h1>} />
    </Routes>
  );
};

export default AppRouter;
