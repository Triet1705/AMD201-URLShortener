import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import HomeMain from "../pages/Home/HomeView.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";
import RegisterPage from "../pages/Register/RegisterPage.jsx";
import PreviewPage from "../pages/Preview/PreviewPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeMain />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "preview",
        element: <PreviewPage />,
      },
    ],
  },
]);

export default router;
