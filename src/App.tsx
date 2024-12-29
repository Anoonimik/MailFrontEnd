import AppInitializer from "./provider/browserRouter/AppInitializer";
import "./App.css";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppInitializer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
