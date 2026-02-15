import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes";

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
