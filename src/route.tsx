import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default router;
