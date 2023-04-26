import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import backgroungImg1 from "../../assets/forget1.jpg";
import ForgotPasswordInputs from "./forgotPasswordInputs"
import logo from "../../assets/mitsLogo.jpeg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyOtp from './verifyOtp'
import PasswordInputs from './passwordInputs'
import SuccessUpdatePassword from "./successUpdatePassword";
import { api } from "../../axios/api.config";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication } from "../../store/slices/auth";
import { ApplicationConstant } from "../../constant/applicationConstant";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {

  const navigate = useNavigate();
  const params = useParams();
  const authState = useSelector((state) => state.authReducer);

  const [step, setStep] = useState(0)
  const dispatch = useDispatch();

  const [forgotPasswordParams, setForgotPasswordParams] = useState({
    mailId: "",
    resetPassword: "",
    confirmResetPassword: "",
  });

  const [otpDetails, setotpDetails] = useState({
    otp:"",
    mailId:""
  })

  const [emailerror, setEmailerror] = useState(false);
  const [otpVerifyed, setOtpVerifyed] = useState(false);
  const [emailValidate_status, setEmailValidate_status] = useState(false);
  const [otpValidate_status, setOtpValidate_status] = useState(false);
  const [resetPasswordValidate_status, setResetPasswordValidate_status] = useState(false);
  const [confirmResetPasswordValidate_status, setConfirmResetPasswordValidate_status] = useState(false);
  const [sendOtpBtn, setSendOtpBtn] = useState(false);
  var errormessage;

  useEffect(() => {
    if(params.passwordfunction === "changepassword"){
      if(localStorage.getItem("MITSinternsid")){
        setStep(2)
        setOtpVerifyed(true)
        setForgotPasswordParams((prev) => ({
          ...prev,
          mailId:authState.mailId
        }))
      }else{
        toast.error("You must Login to change your password or click on 'forgot password' to reset your password. ")
        navigate(ApplicationConstant.LOGIN_URL_PATH);
      }
    }
  }, [params]);
 

  function handleEmail(e) {
    let email = e.target.value;
    // console.log(email,"Hellowedf")
    var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var message = document.getElementById("EmailError");

    if (!email) {
      errormessage = "";
      setEmailValidate_status(false);
      setEmailerror(true);
    } else if (!validEmail.test(email)) {
      errormessage = "Please enter valid Email";
      setEmailValidate_status(false);
      setEmailerror(true);
    } else {
      errormessage = "";
      setEmailValidate_status(true);
      setEmailerror(false);
    }
    console.log(email,"Mail IDadad")
    setForgotPasswordParams((pre)=>({
      ...pre,
      mailId:email
    }))
    setotpDetails((pre) => ({
      ...pre,
      mailId: email,
    }));
    message.textContent = errormessage;
    setSendOtpBtn(false);
    console.log(otpDetails.mailId,"OTP");
  }

  async function getOtp() {
    console.log("first")
    if (!emailValidate_status) {
      toast.error("Email is required");
    } else {
      try {
        const response =  await api.post('/send-otp',{mailId:otpDetails.mailId});
        toast.success(`OTP is send to ${response.data.data.email}`);
        setSendOtpBtn(true);
        setStep(step + 1);
    console.log("sec")

        // console.log(response)
      } catch (error) {
        // console.log(error.response.data);
        toast.error(error.response.data);
      }
    }
  }

  function handleOtp(e){
    let otp = e.target.value;
    if(!otp){
      setOtpValidate_status(false)
    }else{
      setOtpValidate_status(true)
      setotpDetails((pre) => ({
        ...pre,
        otp: otp,
      }));
    }
  }

  function handlechangeEmail(params) {
    setStep(step-1)
    setSendOtpBtn(false);
  }

  async function verifyOtp() {
    if(!otpValidate_status){
      toast.error("Otp is required");
    }else{
      try {
        const response =  await api.post('/verify-otp',otpDetails);
        toast.success("Otp is verifyed Successfully")
        setStep(step + 1);
        setOtpVerifyed(response.data.otpVerifyed);
      } catch (error) {
        toast.error(error.response.data);
      }
    }
  }

   function handleResetPassword(e) {
     let password = e.target.value;
     if(!password){
        setResetPasswordValidate_status(false)
     }else{
       setResetPasswordValidate_status(true)
       setForgotPasswordParams((pre) => ({
         ...pre,
         resetPassword: password,
       }));
     }
   }

   function handleConfirmPassword(e) {
     let password = e.target.value;
     if(!password){
        setConfirmResetPasswordValidate_status(false);
     }else{
        setConfirmResetPasswordValidate_status(true);
        setForgotPasswordParams((pre) => ({
          ...pre,
          confirmResetPassword: password,
        }));
     }
   }

   async function handleUpdatePassword() {
    if(!otpVerifyed){
      toast.error("Please verify Otp");
    }
    else if (!resetPasswordValidate_status || !confirmResetPasswordValidate_status) {
      toast.error("password and confirm Password are required");
    } else if (
      forgotPasswordParams.resetPassword.length < 5 &&
      forgotPasswordParams.confirmResetPassword.length < 5
    ) {
      toast.error("password and confirm Password have atleast 5 characters");
    } else if (
      forgotPasswordParams.resetPassword !=
      forgotPasswordParams.confirmResetPassword
    ) {
      toast.error("password and confirm Password must be same");
    } else {
        try {
          const response = await api.post(
            "/update-password",
            forgotPasswordParams
          );
          toast.success("Your Password Update Successfully");
          setStep(step + 1);
          localStorage.removeItem("MITSinternsid");
           dispatch(
             setAuthentication({
               isAuthenticated: true,
               rollno: "",
               _id: "",
               mailId: "",
               studentName:  "",
               year: "",
               branch:"",
               phoneNumber:  "",
               profile: "",
             })
           );
        } catch (error) {
          toast.error(error.response.data);
        }
    }
   }

  //  console.log(forgotPasswordParams);


  return (
    <div className="loginBody">
      <Card className="loginCard">
        <CardContent>
          <div className="forgotBodyDiv">
            <div>
              <img src={backgroungImg1} className="forgotImg"></img>
            </div>
            <div className="loginInputsBody">
              <div className="loginLogoDiv">
                <img src={logo} width={120}></img>
                <p className="logoText">MITS Interns</p>
                <p>Forgot Password</p>
              </div>
              {(() => {
                if (step === 0) {
                  return (
                    <div>
                      <ForgotPasswordInputs
                        handleEmail={handleEmail}
                        getOtp={getOtp}
                        errormessage={errormessage}
                        sendOtpBtn={sendOtpBtn}
                        emailerror={emailerror}
                        mailId={forgotPasswordParams.mailId}
                      />
                    </div>
                  );
                } else if (step === 1) {
                  return (
                    <div>
                      <VerifyOtp
                        handleOtp={handleOtp}
                        verifyOtp={verifyOtp}
                        handlechangeEmail={handlechangeEmail}
                        setStep={setStep}
                      />
                    </div>
                  );
                } else if (step === 2) {
                  return (
                    <div>
                      <PasswordInputs
                        handleResetPassword={handleResetPassword}
                        handleConfirmPassword={handleConfirmPassword}
                        handleUpdatePassword={handleUpdatePassword}
                      />
                    </div>
                  );
                } else if (step === 3) {
                  return (
                    <div>
                      <SuccessUpdatePassword/>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
