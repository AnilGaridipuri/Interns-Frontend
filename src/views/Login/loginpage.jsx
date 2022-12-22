import React, { useState } from "react";
import LoginInputs from "./loginInputs"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import logo from "../../assets/mitsLogo.jpeg";
import backgroungImg from "../../assets/backgroungImg.jpeg";
import './login.css'

const LoginPage = () => {

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
