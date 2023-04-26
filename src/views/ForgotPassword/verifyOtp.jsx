import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import MailLockIcon from "@mui/icons-material/MailLock";
import Timer from "./timer";

const VerifyOtp = (props) => {
  return (
    <div>
      <div className="loginInputsDiv">
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-otp">OTP</InputLabel>
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
            label="OTP"
          />
        </FormControl>
        <div className="timer">
            <Timer 
              setStep={props.setStep}
            />
        </div>
        <div className="forgotPassBtns">
          <Button className="forgotpassBtn1" onClick={props.handlechangeEmail}>
            Change Email
          </Button>
          <Button className="forgotpassBtn2" onClick={props.verifyOtp}>
            Verify Otp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
