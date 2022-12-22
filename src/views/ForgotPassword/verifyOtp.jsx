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
import MailLockIcon from "@mui/icons-material/MailLock";

const VerifyOtp = (props) => {
  return (
    <div>
      <div className="loginInputsDiv">
        <ToastContainer />
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-otp">Otp</InputLabel>
          <OutlinedInput
            className="loginInputs"
            id="outlined-adornment-otp"
            type="number"
            onChange={props.handleOtp}
            endAdornment={
              <InputAdornment position="end">
                <MailLockIcon />
              </InputAdornment>
            }
            label="Email"
            // value={props.otp}
          />
          <p>Reset Otp</p>
        </FormControl>
        <div className="forgotPassBtns">
          <Button className="forgotpassBtn1" onClick={props.handlechangeEmail}>
            Change Email
          </Button>
          <Button className="forgotpassBtn2" onClick={props.verifyOtp}>
            verify Otp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
