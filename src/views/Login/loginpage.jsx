import React, { useState, useEffect} from "react";
import LoginInputs from "./loginInputs"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import logo from "../../assets/mitsLogo.jpeg";
import backgroungImg from "../../assets/backgroungImg.jpeg";
import { useNavigate } from "react-router-dom";
import { ApplicationConstant } from "../../constant/applicationConstant";
import './login.css'

const LoginPage = () => {

   const navigate = useNavigate();

   const id = localStorage.getItem("MITSinternsid");
   useEffect(() => {
     if (id) {
       navigate(ApplicationConstant.HOME_PAGE_PATH);
     }
   }, [id]);

  return (
    <div className="loginBody">
      <Card className="loginCard">
        <CardContent>
          <div className="loginBodyDiv">
            <div className="loginInputsBody">
              <div className="loginLogoDiv">
                <img src={logo} width={120}></img>
                <p className="logoText">MITS Interns</p>
                <p>Login</p>
              </div>
              <LoginInputs />
            </div>
            <div className="loginBackgroundImg"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
