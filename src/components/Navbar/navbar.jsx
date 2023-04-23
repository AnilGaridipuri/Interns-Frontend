import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/mitsLogo.jpeg";
import "./navbar.css";
import { ApplicationConstant } from "../../constant/applicationConstant";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../../store/slices/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const NavBar = () => {
  const dispatch = useDispatch();
  const pathname = useLocation();
  const authState = useSelector((state) => state.authReducer);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [menuItemsListOpen, setMenuItemsListOpen] = React.useState(false);
  const id = authState._id;
  const MITSinternsid = localStorage.getItem("MITSinternsid");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const logOut = () => {
    localStorage.removeItem("MITSinternsid");
    dispatch(
      setAuthentication({
        isAuthenticated: false,
        rollno: "",
        _id: "",
        studentName: "",
        year: "",
        branch: "",
        phoneNumber: "",
        mailId: "",
        profile: "",
        section: "",
        altmail: "",
      })
    );
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleMenuItems() {
    document.getElementById("menuItemsList")?.classList.toggle("active");
    document.getElementById("navBarBody")?.classList.toggle("active");
    setMenuItemsListOpen(!menuItemsListOpen);
  }

  return (
    <div position="static" className="navBarBody" id="navBarBody">
      <div className="navBarDiv">
        <Typography onClick={handleMenuItems} className="menuIconDiv">
          {menuItemsListOpen == false ? (
            <MenuIcon className="menuIcon" />
          ) : (
            <CancelIcon className="menuIcon" />
          )}
        </Typography>
        <div>
          <div className="navBarLogoDiv">
            <img src={logo} className="mitsLogo"></img>
            <p className="navlogoText">MITS Interns</p>
          </div>
        </div>
        <div className="navBarLinkDiv">
          <div className="menuItemsList" id="menuItemsList">
            <NavLink
              to={ApplicationConstant.HOME_PAGE_PATH}
              className={
                pathname.pathname === ApplicationConstant.HOME_PAGE_PATH
                  ? "navItems_active"
                  : "navItems"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={ApplicationConstant.ALLINTERNSHIP_PAGE_PATH}
              className={
                pathname.pathname ===
                ApplicationConstant.ALLINTERNSHIP_PAGE_PATH
                  ? "navItems_active"
                  : "navItems"
              }
            >
              All Internships
            </NavLink>
            <NavLink
              to={ApplicationConstant.ALL_CERTIFICATIONS}
              className={
                pathname.pathname === ApplicationConstant.ALL_CERTIFICATIONS
                  ? "navItems_active"
                  : "navItems"
              }
            >
              All Certifications
            </NavLink>
          </div>
          <div>
            {!MITSinternsid ? (
              <div className="navLoginBtnDiv NavProfileDiv">
                <div className="divider"></div>
                <NavLink
                  className={
                    pathname.pathname === ApplicationConstant.LOGIN_URL_PATH
                      ? "navLoginBtn_active"
                      : "navLoginBtn"
                  }
                  to={ApplicationConstant.LOGIN_URL_PATH}
                >
                  Login
                </NavLink>
              </div>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <div className="NavProfileDiv">
                  <div className="divider"></div>
                  <Typography className="rollnoText">
                    {authState.mailId.slice(0, 10)}
                  </Typography>
                  <div>
                    <Tooltip title="Open settings">
                      <IconButton
                        onClick={handleOpenUserMenu}
                        sx={{ p: 0 }}
                        className="navProfile"
                      >
                        <Avatar
                          srcSet={authState.profile}
                          sx={{
                            width: "60px",
                            height: "60px",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <NavLink
                          to={`${ApplicationConstant.MYACCOUNT_PROFILE_URL}/${id}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "19px",
                            gap: 5,
                          }}
                        >
                          <AccountCircleIcon fontSize="large" />
                          My Account
                        </NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <NavLink
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "19px",
                            gap: 5,
                          }}
                          onClick={logOut}
                          to={ApplicationConstant.LOGIN_URL_PATH}
                        >
                          <ExitToAppIcon fontSize="large" />
                          Logout
                        </NavLink>
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </Box>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
