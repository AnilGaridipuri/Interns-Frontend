import { useRoutes, useNavigate } from "react-router-dom";
import SideBar from "../../components/sideBar/sidebar";
import { ApplicationConstant } from "../../constant/applicationConstant";
import "./myAccount.css";
import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MyAccount = () => {
  const params = useParams();
  const userDetails = useSelector((state) => state.authReducer);
    const handleMenuIcon = () => {
      // console.log("myacnttt")
      var sidebar = document.querySelector(".sidebarBody");
      sidebar?.classList.toggle("open");
      var sidebar = document.querySelector(".container");
      sidebar?.classList.toggle("change");
      document.getElementById('myAccountBody').classList.toggle('masked')
    };
  return (
    <div className="myAccountDiv">
      <div>
        <SideBar id={params.id} />
      </div>
      <div className="myAccountBody" id='myAccountBody'>
        <div className="sideMenuIconDiv" onClick={handleMenuIcon}>
          <div className="container" id="container">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;
