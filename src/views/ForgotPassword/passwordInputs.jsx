import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ApplicationConstant } from "../../constant/applicationConstant";
import { Link } from "react-router-dom";
import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Button,
  FormControl,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordInputs = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="loginInputsDiv">
        <ToastContainer />
        <p>Create New Password</p>
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            className="loginInputs"
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={props.handleResetPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-confirmpassword">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            className="loginInputs"
            id="outlined-adornment-confirmpassword"
            type={showConfirmPassword ? "text" : "password"}
            onChange={props.handleConfirmPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
        <div className="forgotPassBtns">
          <Link
            className="forgotpassBtn1"
            to={ApplicationConstant.LOGIN_URL_PATH}
          >
            Login
          </Link>
          <Button
            className="forgotpassBtn2"
            onClick={props.handleUpdatePassword}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordInputs;
