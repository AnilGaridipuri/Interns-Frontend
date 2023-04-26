import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import EmailIcon from "@mui/icons-material/Email";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ApplicationConstant } from "../../constant/applicationConstant";

const ForgotPasswordInputs = (props) => {

  console.log(props.mailId,"Mail Id")

  return (
    <div>
        <div className="loginInputsDiv">
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-emali">Email</InputLabel>
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
              value={props.mailId}
              name="mailId"
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
              // disabled={props.sendOtpBtn}
            >
              Send OTP
            </Button>
          </div>
        </div>
    </div>
  );
};

export default ForgotPasswordInputs;
