import React,{useEffect} from "react";
import { ApplicationConstant } from "../../constant/applicationConstant";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./home.css";

const HomePage = () => {
  const id = localStorage.getItem("id");

  return (
    <div className="homeBody">
      <p>hello {id} </p>
      <Link to={ApplicationConstant.LOGIN_URL_PATH}>Login</Link>
    </div>
  );
};

export default HomePage;
