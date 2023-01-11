import { Link } from "react-router-dom";
import React, { useState } from "react";
import { ApplicationConstant } from "../../constant/applicationConstant";
import Menu from "@mui/material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import logo from "../../assets/mitsLogo.jpeg";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import Avatar from "@mui/material/Avatar";
import "./sidebar.css";

const SideBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [menuItemsListOpen, setMenuItemsListOpen] = React.useState(false);
  function handleMenuItems() {
    setMenuItemsListOpen(!menuItemsListOpen);
    handleSideBar();
  }

  const handleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
    document.getElementById("sideBarBody")?.classList.toggle("close");
    document.getElementById("sideBarHeaderDiv")?.classList.toggle("close");
    document.getElementById("sidebarItems")?.classList.toggle("close");
    var sideMenu = document.querySelectorAll(".linkName");
    sideMenu.forEach((item) => {
      item.classList.toggle("close");
    });
  };

  return (
    <div>
      <div onClick={handleMenuItems} className="sideMenuIconDiv">
        {menuItemsListOpen == false ? (
          <MenuIcon className="menuIcon" />
        ) : (
          <CancelIcon className="menuIcon" />
        )}
      </div>
      <div className="sideBarBody" id="sideBarBody">
        <div className="sideBarHeaderDiv" id="sideBarHeaderDiv">
          <img alt="Remy Sharp" src={logo} className="sideBarImg" />
          <p>MITS Interns</p>
          <div onClick={handleSideBar} className="sideBarOCIcon">
            {sideBarOpen ? (
              <KeyboardDoubleArrowLeftIcon />
            ) : (
              <KeyboardDoubleArrowRightIcon />
            )}
          </div>
        </div>
        <div className="sidebarItemsDiv" id="sidebarItemsDiv">
          <Link to={ApplicationConstant.MYACCOUNT_PROFILE_URL}>
            <div className="sidebarItems">
              <AccountCircleIcon />
              <p className="linkName">Profile</p>
            </div>
          </Link>
          <Link to={ApplicationConstant.MYACCOUNT_MYINTERSHIPS_URL}>
            <div className="sidebarItems">
              <DescriptionIcon />
              <p className="linkName">My Internships</p>
            </div>
          </Link>
          <Link to={ApplicationConstant.MYACCOUNT_MYCERTIFICATES_URL}>
            <div className="sidebarItems">
              <ReceiptLongIcon />
              <p className="linkName">My certificates</p>
            </div>
          </Link>
          <Link to={ApplicationConstant.MYACCOUNT_ADD_NEW_INTERNSHIP_URL}>
            <div className="sidebarItems">
              <NoteAddIcon />
              <p className="linkName">Add New Internship</p>
            </div>
          </Link>
          <Link to={ApplicationConstant.MYACCOUNT_EDIT_URL}>
            <div className="sidebarItems">
              <SettingsIcon />
              <p className="linkName">Edit</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
