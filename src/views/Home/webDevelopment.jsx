import React from 'react'
import './domine.css'
import fullStack from './../../assets/fullstack1.png';
import { TypeAnimation } from "react-type-animation";

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
                  "One", // Types 'One'
                  "Two", // Deletes 'One' and types 'Two'
                  "Two Three", // Types 'Three' without deleting 'Two'
                  () => {
                    console.log("Sequence completed"); // Place optional callbacks anywhere in the array
                  },
                ]}
                speed={500}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className="typerText"
              />
            </div>
            <div className="domainShortLinks">
              <a>Start Learning</a>
              <a>Internships</a>
            </div>
          </div>
        <img className="domainHeaderImg" src={fullStack}></img>
      </div>
    </div>
  );
}

export default HomeWebDevelopment;