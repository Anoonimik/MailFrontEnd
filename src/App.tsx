import AppRouter from "./router.tsx";
import "./App.css";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
