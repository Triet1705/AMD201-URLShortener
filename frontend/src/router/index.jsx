import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import HomeMain from "../pages/Home/HomeView.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";
import RegisterPage from "../pages/Register/RegisterPage.jsx";
import PreviewPage from "../pages/Preview/PreviewPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import PublicRoute from "../components/PublicRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <HomeMain />,
          },
          {
            path: "preview",
            element: <PreviewPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
