import React,{useEffect} from "react";
import { ApplicationConstant } from "../../constant/applicationConstant";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./home.css";
import bgvideo1 from '../../assets/v1.mp4'
import QuoteCarousel from "./quoteCarousel";

const HomePage = () => {
  const id = localStorage.getItem("id");

  return (
    <div className="homeBody">

      <video className="bgvideo" loop muted autoPlay>
        <source type="video/mp4" src={bgvideo1} />
      </video>

      <div className="quotes">
        <QuoteCarousel />
      </div>

      <div className="homeContent">
        <h2>Wanna be Internship Ready !!</h2>
      </div>


    </div>
  );
};

export default HomePage;
