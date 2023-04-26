import React from "react";
import { ApplicationConstant } from "../../constant/applicationConstant";
import { NavLink } from "react-router-dom";
import "./home.css";
import bgvideo1 from "../../assets/v1.mp4";
import impInternsip from "../../assets/home-internship.png";
import impProject from "../../assets/home-project.png";
import InternshipJob from "../../assets/Internship-Job.png";
import python from "../../assets/python.jpg";
import dataStructures from "../../assets/data_structure.jpeg";
import OS from "../../assets/os.jpg";
import QuoteCarousel from "./quoteCarousel";
import EastIcon from "@mui/icons-material/East";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import StdAlertBox from "./stdAlertBox";
import { Button, Link } from "@mui/material";

const HomePage = () => {
  const id = localStorage.getItem("id");

  return (
    <div className="homeBody">
      <div className="homePageVideo"></div>
      <video className="bgvideo" loop muted autoPlay>
        <source type="video/mp4" src={bgvideo1} />
      </video>

      <div className="quotes">
        <QuoteCarousel />
      </div>

      <div className="homeContent">
        <div className="impInternCard">
          <p className="impInternCardTitle">Internships are Important!! </p>
          <div className="impInternCardText">
            An internship is an official program offered by organisations to
            help train and provide work experience to students and recent
            graduates.Getting work experience is an essential aspect of starting
            your career as a young graduate. The earlier you start gaining
            experience for your CV, the better.
          </div>
          <div className="impInternCardImgDiv">
            <img className="impInternCardImg" src={impInternsip}></img>
            <div style={{ minWidth: "" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <ArrowRightIcon sx={{ color: "#b302ff" }} />
                <p> Internships provide exposure to the real world</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <ArrowRightIcon sx={{ color: "#b302ff" }} />
                <p>Internships allow you to gain a competitive edge</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <ArrowRightIcon sx={{ color: "#b302ff" }} />
                <p>Internships allow you to learn more about yourself</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <ArrowRightIcon sx={{ color: "#b302ff" }} />
                <p>
                  Internships equip you with more than just technical skills
                </p>
              </div>
              
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <ArrowRightIcon sx={{ color: "#b302ff" }} />
                <p>
                  Internships give you a platform to establish critical
                  networking connections
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="impInternCard">
          <p className="impInternCardTitle">Projects are more Important!! </p>
          <div className="impInternCardText">
          Do you know why final year engineering projects are important? These projects can be inspired by your seniors or copied from other sources. Yet, your faculties give paramount importance to these projects as it is essential for future endeavors and career opportunities.
          An innovative and worthwhile final year project helps to provide practical exposure that helps to enhance your problem-solving skills, management skills, research, and analysis. 
          </div>
          <div className="impInternCardImgDiv">
            <div style={{ minWidth: "50%" }}>
              <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <ArrowRightIcon sx={{ color: "#b302ff" }} />
                  <p>
                  Doing Projects develops Innovative Spirit
                  </p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <ArrowRightIcon sx={{ color: "#b302ff" }} />
                  <p>Doing more projects builds the problem solving skills</p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <ArrowRightIcon sx={{ color: "#b302ff" }} />
                  <p>Projects enhances your Problem Solving and Team Building Abilities</p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <ArrowRightIcon sx={{ color: "#b302ff" }} />
                  <p> Projects helps you to identify a real-time problem and provide a solution</p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <ArrowRightIcon sx={{ color: "#b302ff" }} />
                  <p>
                  The bridge between the theoretical aspects and real world is project based learning
                  </p>
                </div>
            </div>
            <img className="impInternCardImg1" src={impProject}></img>
          </div>
        </div>
        <StdAlertBox />
        <div className="majorDomainsCard">
          <div className="majorDomainsListDiv">
            <p className="majorDomainsCardTitle">
              Top internship domains for students and Guidelines
            </p>
            <div className="majorDomainsList">
              <div className="majorDomainsListItem">
                <p>Web Development</p>
                <div className="LanguageDiv">
                  <Button>HTML</Button>
                  <Button>CSS</Button>
                  <Button>Java Script</Button>
                  <Button>React Js</Button>
                  <NavLink
                    className="majorDomainsListItemLink"
                    to={ApplicationConstant.HOME_PAGE_WEB_DEVELOPMENT_PATH}
                  >
                    Learn
                  </NavLink>
                </div>
              </div>
              <div className="majorDomainsListItem">
                <p>Data Science and Artificial Intelligence</p>
                <div className="LanguageDiv">
                  <Button>Python</Button>
                  <Button>ML</Button>
                  <Button>Mathematics </Button>
                  <NavLink
                    className="majorDomainsListItemLink"
                    to={ApplicationConstant.HOME_PAGE_MACHINE_LEARNING_PATH}
                  >
                    Learn
                  </NavLink>
                </div>
              </div>
              <div className="majorDomainsListItem">
                <p>Android App Development</p>
                <div className="LanguageDiv">
                  <Button>XML</Button>
                  <Button>Java</Button>
                  <NavLink
                    className="majorDomainsListItemLink"
                    to={ApplicationConstant.HOME_PAGE_MACHINE_LEARNING_PATH}
                  >
                    Learn
                  </NavLink>
                </div>
              </div>
              <div className="majorDomainsListItem">
                <p>Mobile App Development</p>
                <div className="LanguageDiv">
                  <Button>XML</Button>
                  <Button>Java</Button>
                  <NavLink
                    className="majorDomainsListItemLink"
                    to={ApplicationConstant.HOME_PAGE_MACHINE_LEARNING_PATH}
                  >
                    Learn
                  </NavLink>
                </div>
              </div>
              <div className="majorDomainsListItem">
                <p>UX/UI Design</p>
                <div className="LanguageDiv">
                  <Button>HTML</Button>
                  <Button>CSS</Button>
                  <NavLink
                    className="majorDomainsListItemLink"
                    to={ApplicationConstant.HOME_PAGE_MACHINE_LEARNING_PATH}
                  >
                    Learn
                  </NavLink>
                </div>
              </div>
              <div className="majorDomainsListItem">
                <p>Embedded Software Engineer</p>
                <div className="LanguageDiv">
                  <Button>C ++</Button>
                  <Button>C</Button>
                  <Button>Linux</Button>
                  <NavLink
                    className="majorDomainsListItemLink"
                    to={ApplicationConstant.HOME_PAGE_MACHINE_LEARNING_PATH}
                  >
                    Learn
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="majorDomainsCardImageDiv">
            <img src={InternshipJob}></img>
          </div>
        </div>
        <div>
          <p className="majorCerificationsCardTitle">
            Most required certification Coures
          </p>
          <div className="cerificationCoursesDiv">
            {certificationDeatils.map((item) => (
              <div className="cerificationCoursesCard">
                <img
                  src={item.img}
                  alt="pythonLogo"
                  className="certificationImg"
                ></img>
                <div className="certificationInfoDiv">
                  <p className="certificationName">{item.title}</p>
                  <div className="certificationInfo">
                    <label style={{ fontWeight: "bold", width: "25%" }}>
                      Program
                    </label>
                    <p style={{ fontWeight: "bold", width: "10%" }}>:</p>
                    <p style={{ width: "50%" }}>{item.program}</p>
                  </div>
                  <div className="certificationInfo">
                    <label style={{ fontWeight: "bold", width: "25%" }}>
                      Duration
                    </label>
                    <p style={{ fontWeight: "bold", width: "10%" }}>:</p>
                    <p style={{ width: "50%" }}>{item.duration}</p>
                  </div>
                  <div className="certificationInfo">
                    <label style={{ fontWeight: "bold", width: "25%" }}>
                      Sections
                    </label>
                    <p style={{ fontWeight: "bold", width: "10%" }}>:</p>
                    <p style={{ width: "50%" }}>{item.sections}</p>
                  </div>
                  <div className="certificationInfo">
                    <label style={{ fontWeight: "bold", width: "25%" }}>
                      Price
                    </label>
                    <p style={{ fontWeight: "bold", width: "10%" }}>:</p>
                    <p style={{ width: "50%" }}>{item.price} /-</p>
                  </div>
                  <div className="certificationInfo">
                    <label style={{ fontWeight: "bold", width: "25%" }}>
                      Platform
                    </label>
                    <p style={{ fontWeight: "bold", width: "10%" }}>:</p>
                    <p style={{ width: "50%" }}>{item.platform}</p>
                  </div>
                </div>
                <div className="certificationLink">
                  <a href={item.link} target="_blank">
                    Gets Started
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const certificationDeatils = [
  {
    img: python,
    title: "Complete Python Developer in 2023: Zero to Mastery",
    program: "Python",
    duration: "30h 52m total length",
    sections: 25,
    price: 549,
    platform: "Udmey.com",
    link: "https://www.udemy.com/course/complete-python-developer-zero-to-mastery/",
  },
  {
    img: dataStructures,
    title: "The Complete Data Structures and Algorithms",
    program: "Python",
    duration: "42h 24m total length",
    sections: 48,
    price: 549,
    platform: "Udmey.com",
    link: "https://www.udemy.com/course/data-structures-and-algorithms-bootcamp-in-python/",
  },
  {
    img: OS,
    title: "Operating System",
    program: "C",
    duration: "7h 45m total length",
    sections: 5,
    price: 549,
    platform: "Udmey.com",
    link: "https://www.udemy.com/course/operating-system-j/",
  },
];
