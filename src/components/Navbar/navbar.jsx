import * as React from "react";
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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../../assets/mitsLogo.jpeg";
import profile from "../../assets/profile.JPG";
import './navbar.css'
import { ApplicationConstant } from "../../constant/applicationConstant";
import { Link } from "react-router-dom";

const menuList = [
  {
    name: "Home",
    path: `${ApplicationConstant.HOME_PAGE_PATH}`,
    className: "navItems",
  },
  {
    name: "My Account",
    path: "/my-account",
    className: "navItems",
  },
  {
    name: "Project",
    path: "/Results",
    className: "navItems",
  },
  {
    name: "Reslut",
    path: "/Projects",
    className: "navItems",
  },
];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [menuItemsListOpen, setMenuItemsListOpen] = React.useState(false)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  
  function hanbleMenuItems (){
    document.getElementById("menuItemsList")?.classList.toggle("active");
    document.getElementById("navBarBody")?.classList.toggle("active");
    setMenuItemsListOpen(!menuItemsListOpen);
    console.log("hello")
  }

  return (
    <AppBar position="static" className="navBarBody" id="navBarBody">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="navBarLogoDiv">
            <img src={logo} className="mitsLogo"></img>
            <p className="navlogoText">MITS Interns</p>
          </div>
          <Typography onClick={hanbleMenuItems} className="menuIconDiv">
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
            {menuList.map((item, index) => (
              <Link
                to={item.path}
                className=""
                key={index}
                onClick={hanbleMenuItems}
              >
                {item.name}
              </Link>
            ))}
          </Typography>
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
                    <Typography textAlign="center">LogOut</Typography>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
