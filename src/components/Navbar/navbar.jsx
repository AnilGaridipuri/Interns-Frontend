import React ,{useEffect,useState} from "react";
import AppBar from "@mui/material/AppBar";
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
import profile from "../../assets/profile.JPG";
import './navbar.css'
import { ApplicationConstant } from "../../constant/applicationConstant";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../../store/slices/auth";

const menuList = [
  {
    name: "Home",
    path: `${ApplicationConstant.HOME_PAGE_PATH}`,
    className: "navItems",
  },
  {
    name: "InternShips",
    path: '#',
    className: "navItems",
  },
];

const NavBar = () => {

  const dispatch = useDispatch();
  const pathname = useLocation();
  const authState = useSelector((state) => state.authReducer);
  console.log(authState)
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [menuItemsListOpen, setMenuItemsListOpen] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const hadleNavItem =(props)=>{
     var sideMenu = document.querySelectorAll(".navItems");
     sideMenu.forEach((item,index) => {
        if (props == index){
          item.classList.toggle("active");
        }else{
          item.classList.remove('active')
        }
     });
  }

  const logOut = () =>{
    localStorage.removeItem("MITSinternsid");
    dispatch(
      setAuthentication({
        isAuthenticated: false,
        username: "",
        _id: "",
        mailId: ""
      })
    );
  }

  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  function handleMenuItems (){
    document.getElementById("menuItemsList")?.classList.toggle("active");
    document.getElementById("navBarBody")?.classList.toggle("active");
    setMenuItemsListOpen(!menuItemsListOpen);
  }

  return (
    <AppBar position="static" className="navBarBody" id="navBarBody">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="navBarLogoDiv">
            <img src={logo} className="mitsLogo"></img>
            <p className="navlogoText">MITS Interns</p>
          </div>

          {/* only display in modile screen  */}
          <Typography onClick={handleMenuItems} className="menuIconDiv">
            {menuItemsListOpen == false ? (
              <MenuIcon className="menuIcon" />
            ) : (
              <CancelIcon className="menuIcon" />
            )}
          </Typography>
          <Typography
            className="menuItemsList"
            textAlign="Right"
            id="menuItemsList"
          >
            <Link
              to={ApplicationConstant.HOME_PAGE_PATH}
              className={
                pathname.pathname === ApplicationConstant.HOME_PAGE_PATH
                  ? "navItems_active"
                  : "navItems"
              }
            >
              Home
            </Link>
            <Link
              to={ApplicationConstant.ALL_INTERNS}
              className={
                pathname.pathname === ApplicationConstant.ALL_INTERNS
                  ? "navItems_active"
                  : "navItems"
              }
            >
              All Interns
            </Link>
          </Typography>
          <div>
            {!authState.isAuthenticated ? (
              <div className="navLoginBtnDiv NavProfileDiv">
                <Link
                  className="navLoginBtn"
                  to={ApplicationConstant.LOGIN_URL_PATH}
                >
                  Login
                </Link>
              </div>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <div className="NavProfileDiv">
                  <div className="divider"></div>
                  <Typography className="userNameText">Anil Kumar</Typography>
                  <div>
                    <Tooltip title="Open settings">
                      <IconButton
                        onClick={handleOpenUserMenu}
                        sx={{ p: 0 }}
                        className="navProfile"
                      >
                        <Avatar alt="Remy Sharp" src={profile} />
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
                        <Link
                          textAlign="center"
                          to={ApplicationConstant.MYACCOUNT_URL}
                        >
                          My Account
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link
                          textAlign="center"
                          onClick={logOut}
                          to={ApplicationConstant.LOGIN_URL_PATH}
                        >
                          LogOut
                        </Link>
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </Box>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
