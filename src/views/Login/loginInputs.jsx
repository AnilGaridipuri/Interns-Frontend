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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "./login.css";
import { api } from "../../axios/api.config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../../store/slices/auth";

const LoginInputs = (props) => {
  const [userLogin, setUserLogin] = useState({
    mailId: "",
    password: " ",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailValidate_status, setEmailValidate_status] = useState(false);
  const [email, setEmail] = useState(false);
  const [passwordValidate_status, setPasswordValidate_status] = useState(false);
  const [loginBtn, setLoginBtn] = useState(false);
  var errormessage;

  function handleEmail(e) {
    let email = e.target.value;
    var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var message = document.getElementById("EmaliError");

    if (!email) {
      errormessage = "";
      setEmailValidate_status(false);
      setEmail(true);
    } else if (!validEmail.test(email)) {
      errormessage = "Please enter valid Email";
      setEmailValidate_status(false);
      setEmail(true);
    } else {
      errormessage = "";
      setEmailValidate_status(true);
      setEmail(false);
    }
    message.textContent = errormessage;
    setUserLogin((pre) => ({
      ...pre,
      mailId: email,
    }));
    setLoginBtn(false);
  }

  function handlePassword(e) {
    let password = e.target.value;
    if (password) {
      setPasswordValidate_status(true);
    }
    setUserLogin((pre) => ({
      ...pre,
      password: password,
    }));
    setLoginBtn(false);
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  async function submitLogin(e) {
    if (!emailValidate_status) {
      toast.error("Email is required");
    } else if (!passwordValidate_status) {
      toast.error("Password is required");
    } else {
      try {
        const responce = await api.post(`/auth`, userLogin);
        toast.success("Successfully Login");
        localStorage.setItem("MITSinternsid", responce.data._id);
        console.log(responce.data);
        setLoginBtn(true);
        dispatch(
          setAuthentication({
            isAuthenticated: true,
            rollno: responce.data.rollno || "",
            _id: responce.data._id,
            mailId: responce.data.mailId,
            studentName: responce.data.studentName || "",
            year: responce.data.year || "",
            branch: responce.data.branch || "",
            phoneNumber: responce.data.phoneNumber || "",
            profile: responce.data.profile || "",
          })
        );
        navigate(ApplicationConstant.HOME_PAGE_PATH);
      } catch (error) {
        toast.error(error.response.data);
        console.log(error.response.data);
      }
    }
  }

  return (
    <div>
      <ValidatorForm>
        <div className="loginInputsDiv">
          <ToastContainer />
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-emali">Emali</InputLabel>
            <OutlinedInput
              className="loginInputs"
              error={email}
              id="outlined-adornment-Email"
              type="email"
              onChange={handleEmail}
              endAdornment={
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              }
              label="Email"
            />
            <p id="EmaliError" className="errorMessage">
              {errormessage}
            </p>
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              className="loginInputs"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={handlePassword}
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
            <div>
              <Link
                to={ApplicationConstant.FORGOTPASSWORD_URL_PATH}
                className="forgitPaswText"
              >
                Forgot Password?
              </Link>
            </div>
          </FormControl>
          <Button
            className="submitLoginBtn"
            type="submit"
            onClick={submitLogin}
            disabled={loginBtn}
          >
            Login
          </Button>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default LoginInputs;
