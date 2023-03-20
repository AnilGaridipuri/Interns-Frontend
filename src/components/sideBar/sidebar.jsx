import { NavLink, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { ApplicationConstant } from "../../constant/applicationConstant";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import logo from "../../assets/mitsLogo.jpeg";
import "./sidebar.css";
import { useSelector } from "react-redux";

const Sidebar = (props) => {
  const pathname = useLocation();
  const authState = useSelector((state) => state.authReducer);

  var [sidebarOpen, setSidebarOpen] = useState(false);
  
    var [classSubmenu, setClassSubmenu] = useState("SubMenu_group");

    function className() {
        setClassSubmenu("SubMenu_group");
    }
    function className_active() {
        setClassSubmenu("tooltip_submenu");
    }

  function collapse() {
    var collapseBtn = document.querySelector(".collapes_button");
    var sidebar = document.querySelector(".sidebarBody");
    var sidebarLinksDiv = document.querySelector(".sidebarLinksDiv");

    setSidebarOpen(!sidebarOpen);
    sidebar?.classList.toggle("active");
    collapseBtn?.classList.toggle("active");
    sidebarLinksDiv?.classList.toggle("active");
  }

   const handleMenuIcon = () => {
     var sidebar = document.querySelector(".sidebarBody");
     sidebar?.classList.toggle("open");
     var sidebar = document.querySelector(".sideMenuIconDiv");
     sidebar?.classList.toggle("open");
   };


  return (
    <div className="sidebarBody" id="sidebarBody">
      <div className="collapes_button">
        <div>
          <i className="icon" onClick={collapse}>
            {sidebarOpen === false ? (
              <KeyboardDoubleArrowLeftIcon onClick={className_active} />
            ) : (
              <KeyboardDoubleArrowRightIcon onClick={className} />
            )}
          </i>
        </div>
      </div>
      <div className="siderbarHeader">
        <img alt="Remy Sharp" src={logo} className="sideBarImg" />
        <p>MITS Interns</p>
      </div>
      <div className="sidebarLinksDiv">
        <NavLink
          to={`${ApplicationConstant.MYACCOUNT_PROFILE_URL}/${props.id}`}
        >
          <div
            className={
              pathname.pathname ===
              `${ApplicationConstant.MYACCOUNT_PROFILE_URL}/${props.id}`
                ? "sidebarItems_active"
                : "sidebarItems"
            }
          >
            <AccountCircleIcon fontSize="large" />
            <p className="linkName">Profile</p>
            <span className="tooltip_sidemenu">Profile</span>
          </div>
        </NavLink>
        <NavLink
          to={`${ApplicationConstant.MYACCOUNT_MYINTERSHIPS_URL}/${props.id}`}
        >
          <div
            className={
              pathname.pathname ===
              `${ApplicationConstant.MYACCOUNT_MYINTERSHIPS_URL}/${props.id}`
                ? "sidebarItems_active"
                : "sidebarItems"
            }
          >
            <DescriptionIcon fontSize="large" />
            <p className="linkName">
              {authState._id == props.id ? "My Internships" : "Internships"}
            </p>
            <span className="tooltip_sidemenu">
              {authState._id == props.id ? "My Internships" : "Internships"}
            </span>
          </div>
        </NavLink>
        <NavLink
          to={`${ApplicationConstant.MYACCOUNT_MYCERTIFICATES_URL}/${props.id}`}
        >
          <div
            className={
              pathname.pathname ===
              `${ApplicationConstant.MYACCOUNT_MYCERTIFICATES_URL}/${props.id}`
                ? "sidebarItems_active"
                : "sidebarItems"
            }
          >
            <ReceiptLongIcon fontSize="large" />
            <p className="linkName">
              {authState._id == props.id ? "My certificates" : "Certificates"}
            </p>
            <span className="tooltip_sidemenu">
              {authState._id == props.id ? "My certificates" : "Certificates"}
            </span>
          </div>
        </NavLink>
        {authState._id == props.id ? (
          <div>
            <NavLink
              to={`${ApplicationConstant.MYACCOUNT_ADD_NEW_INTERNSHIP_URL}/${props.id}`}
            >
              <div
                className={
                  pathname.pathname ===
                  `${ApplicationConstant.MYACCOUNT_ADD_NEW_INTERNSHIP_URL}/${props.id}`
                    ? "sidebarItems_active"
                    : "sidebarItems"
                }
              >
                <NoteAddIcon fontSize="large" />
                <p className="linkName">Add New Internship</p>
                <span className="tooltip_sidemenu">Add New Internship</span>
              </div>
            </NavLink>
            <NavLink
              to={`${ApplicationConstant.MYACCOUNT_EDIT_URL}/${props.id}`}
            >
              <div
                className={
                  pathname.pathname ===
                  `${ApplicationConstant.MYACCOUNT_EDIT_URL}/${props.id}`
                    ? "sidebarItems_active"
                    : "sidebarItems"
                }
              >
                <SettingsIcon fontSize="large" />
                <p className="linkName">Edit</p>
                <span className="tooltip_sidemenu">Edit</span>
              </div>
            </NavLink>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
