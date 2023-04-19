import React from "react";
import { ApplicationConstant } from "../../constant/applicationConstant";
import { NavLink } from "react-router-dom";
import "./home.css";
import bgvideo1 from '../../assets/v1.mp4'
import impInternsip from "../../assets/impsOfInternship.jpg";
import impInternsip1 from "../../assets/impsIntern1.webp";
import InternshipJob from "../../assets/Internship-Job.png";
import QuoteCarousel from "./quoteCarousel";
import EastIcon from "@mui/icons-material/East";
// import { Outlet } from "react-router-dom"; 
import StdAlterBox from "./stdAlterBox";
import { Button } from "@mui/material";

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
          <p className="impInternCardTitle">
            Importance of an Internship and Project{" "}
          </p>
          <div className="impInternCardText">
            Although it is a known fact that an internship is the best way to
            make your career, students sometimes feel it isn't worth the effort
            or just not important enough. These thoughts may come across as
            common with students and they may not realize the importance of
            internships instantly. But in today's competitive world, there is
            nothing more important than an internship or a practicum. Once they
            get hands-on experience as part of their curriculum, they feel
            enriched and ready to enter the real-work scenario with practical
            skills.
          </div>
          <div className="impInternCardText">
            An internship is a period of work experience offered by an
            organization for a limited period of time. It is aimed at providing
            practical experience to the candidates when they implement their
            classroom learning in real-time work situations. It helps them learn
            the ways to understand and perform the desired duties and
            responsibilities in a particular role effectively. An internship is
            an amalgamation of theory and practice. Student interns equip
            themselves with practical skills in office settings. Internships
            also offer the benefit of creating professional recommendations,
            practical experience for your resume, and building networking
            opportunities.
          </div>
          <div className="impInternCardImgDiv">
            <img className="impInternCardImg" src={impInternsip}></img>
            <div style={{ minWidth: "50%" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <EastIcon sx={{ color: "#b302ff" }} />
                <p> Apply Theoretical Knowledge in the Real World</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <EastIcon sx={{ color: "#b302ff" }} />
                <p>Expand on Your Transferrable Skills</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <EastIcon sx={{ color: "#b302ff" }} />
                <p>Develop Professional Connections</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <EastIcon sx={{ color: "#b302ff" }} />
                <p>Make New Friends</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <EastIcon sx={{ color: "#b302ff" }} />
                <p>Boost Your Resume</p>
              </div>
            </div>
          </div>
          <div className="impInternCardImgDiv">
            <div style={{ minWidth: "50%" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <EastIcon sx={{ color: "#b302ff" }} />
                <p>Direct Job Offers Are More Likely</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <EastIcon sx={{ color: "#b302ff" }} />
                <p>Better Job Stability</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <EastIcon sx={{ color: "#b302ff" }} />
                <p>Higher Salary Potential</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <EastIcon sx={{ color: "#b302ff" }} />
                <p>Refine Career Goals</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <EastIcon sx={{ color: "#b302ff" }} />
                <p>Internships allow you to learn more about yourself</p>
              </div>
            </div>
            <img className="impInternCardImg1" src={impInternsip1}></img>
          </div>
        </div>
        <StdAlterBox />
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
          <p>Most required certification Coures</p>
        </div>
        <h2>Wanna be Internship Ready !!</h2>
      </div>
      {/* <Outlet /> */}
    </div>
  );
};

export default HomePage;
