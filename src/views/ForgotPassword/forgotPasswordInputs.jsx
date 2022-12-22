import React, { useState } from "react";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ApplicationConstant } from "../../constant/applicationConstant";

const ForgotPasswordInputs = (props) => {

  return (
    <div>
        <div className="loginInputsDiv">
          <ToastContainer />
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-emali">Emali</InputLabel>
            <OutlinedInput
              className="loginInputs"
              error={props.emailerror}
              id="outlined-adornment-Email"
              type="email"
              onChange={props.handleEmail}
              endAdornment={
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              }
              label="Email"
              value={props.email}
            />
            <p id="EmaliError" className="errorMessage">
              {props.errormessage}
            </p>
          </FormControl>
          <div className="forgotPassBtns">
            <Link
              to={ApplicationConstant.LOGIN_URL_PATH}
              className="forgotpassBtn1"
            >
              Login
            </Link>
            <Button
              className="forgotpassBtn2"
              onClick={props.getOtp}
              disabled={props.sendOtpBtn}
            >
              Send OTP
            </Button>
          </div>
        </div>
    </div>
  );
};

export default ForgotPasswordInputs;
