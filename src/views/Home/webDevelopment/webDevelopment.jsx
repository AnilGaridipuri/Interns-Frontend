import React, {useEffect} from 'react'
import './../domain.css'
import fullStack from './../../../assets/fullstack1.png'
import WebLearn from './webLearn'
import WebInternships from './webInternships'
import { TypeAnimation } from "react-type-animation";
import { NavLink } from "react-router-dom";
import { ApplicationConstant } from '../../../constant/applicationConstant'
import { Outlet} from "react-router-dom";



const HomeWebDevelopment = () => {

  return (
    <div>
      <div className="domainHeaderBody">
        <div className="domainHeaderText">
          <div className="wrapper one">
            <div className="drop-main">
              <div className="d">W</div>
              <div className="r">e</div>
              <div className="o">b</div> &nbsp;
              <div className="s">D</div>
              <div className="s">e</div>
              <div className="s">v</div>
              <div className="s">e</div>
              <div className="s">l</div>
              <div className="s">p</div>
              <div className="s">m</div>
              <div className="s">e</div>
              <div className="s">n</div>
              <div className="s">t</div>
            </div>
            <TypeAnimation
              sequence={[
                "Front-End ", // Types 'One'
                "Back-End ", // Deletes 'One' and types 'Two'
                "Full-Stack ", // Types 'Three' without deleting 'Two'
                "Web Designing",
              ]}
              speed={300}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="typerText"
            />
          </div>
          <div className="domainShortLinks">
            <NavLink
              to={ApplicationConstant.WEB_LEARNING}
            >
              Start Learning
            </NavLink>
            <NavLink
              to={ApplicationConstant.WEB_VIEW_INTERNSHIPS}
            >
              Internships
            </NavLink>
          </div>
        </div>
        <img className='domainHeaderImg' src={fullStack}></img>
      </div>
      <Outlet />

    </div>
  );
}

export default HomeWebDevelopment;
