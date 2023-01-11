import { useRoutes, useNavigate } from "react-router-dom";
import SideBar from "../../components/sideBar/sidebar";
import { ApplicationConstant } from "../../constant/applicationConstant";
// import Profile from "./profile";
// import { Navigate, useParams } from "react-router-dom";
// import MyInterships from "./myInterships";
import "./myAccount.css";
// import MyRoutes from "../../router";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const MyAccount = () => {
  var navigate = useNavigate();

  useEffect(() => {
    navigate(`${ApplicationConstant.MYACCOUNT_PROFILE_URL}`);
  }, []);

  return (
    <div className="myAccountDiv">
      <div>
        <SideBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;
