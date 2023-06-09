import { NavLink, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { Avatar } from "@mui/material";
import { api } from "../../axios/api.config";

const Sidebar = (props) => {
  const pathname = useLocation();

  var [sidebarOpen, setSidebarOpen] = useState(false);

  const [userAccount, setUserAccount] = useState({});

  const authState = useSelector((state) => state.authReducer);

  useEffect(()=>{
    document.addEventListener('click',handleclickOutside, true)
  },[])

  const handleclickOutside = (e)=>{
    var sidebar = document.querySelector(".sidebarBody");
    var sidebarToggleIcon = document.querySelector(".container");
    if(sidebar.classList.contains('open')){
      if(!sidebar.contains(e.target) && !sidebarToggleIcon.contains(e.target)){
        handleMenuIcon()
      }
    }
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
    var sidebar = document.querySelector(".container");
    sidebar?.classList.toggle("change");
    document.getElementById('myAccountBody').classList.toggle('masked')
  };

  const getProfilePic = async () => {
      const res = await api.post("auth/user", {
        id: props.id,
      });
      setUserAccount(res.data);
  };

  useEffect(() => {
    getProfilePic();
  }, [props.id,authState]);

  return (
    <div className="sidebarBody" id="sidebarBody">
      <div className="collapes_button">
        <div>
          <i className="icon" onClick={collapse}>
            {sidebarOpen === false ? (
              <KeyboardDoubleArrowLeftIcon />
            ) : (
              <KeyboardDoubleArrowRightIcon />
            )}
          </i>
        </div>
      </div>
      <div className="siderbarHeader">
        <Avatar
          className="sideBarAvatar"
          srcSet={userAccount.profile}
          sx={{
            width: "40px",
            height: "40px",
          }}
        />
        {authState._id === props.id ? (
          <h3>My Account</h3>
        ) : (
          <h3>{userAccount.studentName}</h3>
        )}
      </div>
      <div className="sidebarLinksDiv">
        <NavLink
          onClick={()=>{setTimeout(handleMenuIcon, 1000)}}
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
          onClick={()=>{setTimeout(handleMenuIcon, 1000)}}
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
              {authState._id === props.id ? "My Internships" : "Internships"}
            </p>
            <span className="tooltip_sidemenu">
              {authState._id === props.id ? "My Internships" : "Internships"}
            </span>
          </div>
        </NavLink>
        <NavLink
          onClick={()=>{setTimeout(handleMenuIcon, 1000)}}
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
              {authState._id === props.id
                ? "My Certifications"
                : "Certifications"}
            </p>
            <span className="tooltip_sidemenu">
              {authState._id === props.id
                ? "My Certifications"
                : "Certifications"}
            </span>
          </div>
        </NavLink>
        {authState._id === props.id ? (
          <div>
            <NavLink
              onClick={()=>{setTimeout(handleMenuIcon, 1000)}}
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
                <WorkHistoryIcon fontSize="large" />
                <p className="linkName">Add New Internship</p>
                <span style={{width:'180px'}}  className="tooltip_sidemenu">Add New Internship</span>
              </div>
            </NavLink>
            <NavLink
              onClick={()=>{setTimeout(handleMenuIcon, 1000)}}
              to={`${ApplicationConstant.MYACCOUNT_ADD_NEW_CERTIFICATIONS_URL}/${props.id}`}
            >
              <div
                className={
                  pathname.pathname ===
                  `${ApplicationConstant.MYACCOUNT_ADD_NEW_CERTIFICATIONS_URL}/${props.id}`
                    ? "sidebarItems_active"
                    : "sidebarItems"
                }
              >
                <NoteAddIcon fontSize="large" />
                <p className="linkName">Add New Certifications</p>
                <span style={{width:'180px'}} className="tooltip_sidemenu">Add New Certification</span>
              </div>
            </NavLink>
            <NavLink
              onClick={()=>{setTimeout(handleMenuIcon, 1000)}}
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
                <p className="linkName">Edit Profile</p>
                <span className="tooltip_sidemenu">Edit Profile</span>
              </div>
            </NavLink>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
