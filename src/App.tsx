import AppRouter from "./router.tsx";
import "./App.css";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
