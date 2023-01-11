import { ApplicationConstant } from "../constant/applicationConstant";
import { useRoutes } from "react-router-dom";
import HomePage from '../views/Home//homePage'
import LoginPage from "../views/Login/loginpage"
import ForgotPasswordPage from "../views/ForgotPassword/forgotPasswordPage"
import MyAccount from "../views/myAccount"
import Profile from "../views/myAccount/profile"
import MyCertificates from "../views/myAccount/mycertificates"
import MyInterships from '../views/myAccount/myInterships'
import AddNewInternship from "../views/myAccount/addNewInternship"
import EditProfile from "../views/myAccount/EditProfile"

const Router = () => {
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
    {
      path: ApplicationConstant.MYACCOUNT_URL,
      element: <MyAccount />,
      children:[
        {
          path: ApplicationConstant.MYACCOUNT_PROFILE_URL,
          element: <Profile/>,
        },
        {
          path: ApplicationConstant.MYACCOUNT_MYINTERSHIPS_URL,
          element: <MyInterships/>,
        },
        {
          path: ApplicationConstant.MYACCOUNT_MYCERTIFICATES_URL,
          element: <MyCertificates/>,
        },
        {
          path: ApplicationConstant.MYACCOUNT_ADD_NEW_INTERNSHIP_URL,
          element: <AddNewInternship/>,
        },
        {
          path: ApplicationConstant.MYACCOUNT_EDIT_URL,
          element: <EditProfile/>,
        },
      ]
    },
  ]);
}

export default Router;