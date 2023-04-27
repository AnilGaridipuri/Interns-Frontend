import React, { useEffect } from "react";
import { ApplicationConstant } from "../constant/applicationConstant";
import { useRoutes, useNavigate } from "react-router-dom";
import HomePage from "../views/Home//homePage";
import LoginPage from "../views/Login/loginpage";
import ForgotPasswordPage from "../views/ForgotPassword/forgotPasswordPage";
import MyAccount from "../views/myAccount";
import Profile from "../views/myAccount/profile";
import MyCertificates from "../views/myAccount/mycertificates";
import MyInterships from "../views/myAccount/myInterships";
import AddNewInternship from "../views/myAccount/addNewInternship";
import EditProfile from "../views/myAccount/EditProfile";
import AllInternShips from "../views/AllInternShips/AllInternShips";
import AddNewCertification from "../views/myAccount/addNewCertification";
import AllCertifications from "../views/AllInternShips/AllCertifications"
import HomeWebDevelopment from "../views/Home/webDevelopment/webDevelopment";
import WebLearn from "../views/Home/webDevelopment/webLearn";
import WebInternships from "../views/Home/webDevelopment/webInternships";
import HomeMachineLearning from "../views/Home/machineLearning";

export default function App() {

  return useRoutes([
    {
      children: [
        {
          path: ApplicationConstant.HOME_PAGE_PATH,
          element: <HomePage />,
        },
        {
          path: ApplicationConstant.HOME_PAGE_WEB_DEVELOPMENT_PATH,
          element: <HomeWebDevelopment />,
        },
        {
          path: ApplicationConstant.HOME_PAGE_MACHINE_LEARNING_PATH,
          element: <HomeMachineLearning />,
        },
      ],
    },
    {
      path: ApplicationConstant.ALLINTERNSHIP_PAGE_PATH,
      element: <AllInternShips />,
    },
    {
      path: ApplicationConstant.ALL_CERTIFICATIONS,
      element: <AllCertifications />,
    },
    {
      path: ApplicationConstant.LOGIN_URL_PATH,
      element: <LoginPage />,
    },
    {
      path: ApplicationConstant.FORGOTPASSWORD_DYNAMIC_URL_PATH,
      element: <ForgotPasswordPage />,
    },
    {
      path: ApplicationConstant.MYACCOUNT_URL,
      element: <MyAccount />,
      children: [
        {
          path: ApplicationConstant.MYACCOUNT_PROFILE_DYNAMIC_URL,
          element: <Profile />,
        },
        {
          path: ApplicationConstant.MYACCOUNT_MYINTERSHIPS_DYNAMIC_URL,
          element: <MyInterships />,
        },
        {
          path: ApplicationConstant.MYACCOUNT_MYCERTIFICATES_DYNAMIC_URL,
          element: <MyCertificates />,
        },
        {
          path: ApplicationConstant.MYACCOUNT_ADD_NEW_INTERNSHIP_DYNAMIC_URL,
          element: <AddNewInternship />,
        },
        {
          path: ApplicationConstant.MYACCOUNT_ADD_NEW_CERTIFICATIONS_DYNAMIC_URL,
          element: <AddNewCertification />,
        },
        {
          path: ApplicationConstant.MYACCOUNT_EDIT_DYNAMIC_URL,
          element: <EditProfile />,
        },
      ],
    },
  ]);
}
