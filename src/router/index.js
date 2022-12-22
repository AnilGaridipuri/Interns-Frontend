import { ApplicationConstant } from "../constant/applicationConstant";
import { useRoutes } from "react-router-dom";
import HomePage from '../views/Home//homePage'
import LoginPage from "../views/Login/loginpage"
import ForgotPasswordPage from "../views/ForgotPassword/forgotPasswordPage"

export default function App() {
  return useRoutes([
    {
      path: ApplicationConstant.HOME_PAGE_PATH,
      element: <HomePage />,
    },
    {
      path: ApplicationConstant.LOGIN_URL_PATH,
      element: <LoginPage />,
    },
    {
      path: ApplicationConstant.FORGOTPASSWORD_URL_PATH,
      element: <ForgotPasswordPage />,
    },
  ]);
}
