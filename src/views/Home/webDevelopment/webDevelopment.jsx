import React from 'react'
import './../domain.css'
import fullStack from './../../../assets/fullstack1.png'
import WebLearn from './webLearn'
import WebInternships from './webInternships'

const HomeWebDevelopment = () => {
  return (
    <div>
      <div className="domainHeaderBody">
        <div>
          <div class="content">
            <h2>Full Stack Development</h2>
          </div>
        </div>
        <img className='domainHeaderImg' src={fullStack}></img>
      </div>
      <WebLearn />
      <WebInternships />
    </div>
  );
}

export default HomeWebDevelopment;