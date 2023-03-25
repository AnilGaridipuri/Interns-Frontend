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
  
    var [classSubmenu, setClassSubmenu] = useState("SubMenu_group");

  const [ userAccount, setUserAccount] = useState({})

    const authState = useSelector((state) => state.authReducer);

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

   const getProfilePic = async () => {
    if (authState._id === props.id){
      const res =  await api.post(`auth/user`, {
        id: authState._id
      });
      console.log('-----------------',res.data)
      setUserAccount(res.data);
    }else{
      const res = await api.post('auth/user', {
        id: props.id
      })
      
      setUserAccount(res.data);
    }
   }

  useEffect(() => {
    getProfilePic()
    console.log('+++++++++++++++=',userAccount)
  }, [props.id])


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
          <Avatar
            className="sideBarAvatar"
            srcSet={userAccount.profile}
            sx={{
              width: "40px",
              height: "40px",
            }}
          />
        {authState._id === props.id ? <h3>My Account</h3> : <h3>{userAccount.studentName}</h3>}
      </div>
      <div className="sidebarLinksDiv">
        <NavLink
          onClick={handleMenuIcon}
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
          onClick={handleMenuIcon}
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
          onClick={handleMenuIcon}
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
              {authState._id === props.id ? "My Certifications" : "Certifications"}
            </p>
            <span className="tooltip_sidemenu">
              {authState._id === props.id ? "My Certifications" : "Certifications"}
            </span>
          </div>
        </NavLink>
        {authState._id === props.id ? (
          <div>
            <NavLink
              onClick={handleMenuIcon}
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
                <span className="tooltip_sidemenu">Add New Internship</span>
              </div>
            </NavLink>
            <NavLink
              onClick={handleMenuIcon}
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
                <span className="tooltip_sidemenu">Add New Certifications</span>
              </div>
            </NavLink>
            <NavLink
              onClick={handleMenuIcon}
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
