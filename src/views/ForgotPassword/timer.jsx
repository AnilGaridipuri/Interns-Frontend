import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router";
import { ApplicationConstant } from '../../constant/applicationConstant';
import { ToastInfoMessage } from '../../uitils/toastMessage';

function Timer(props) {
  const [seconds, setSeconds] = useState(180);


  useEffect(()=>{
    if(seconds>0){
      const interval = setInterval(() => setSeconds(seconds-1), 1000);
      return () => clearInterval(interval);
    }else if(seconds===0){
      props.setStep(0)
      ToastInfoMessage('Ypur OTP is expired. Please Try again.')
    }
  },[seconds])


  return (
    <div className='timerText'>
      Your OTP expires in <span style={{'color':'red'}}>{seconds}</span> sec
    </div>
  )
}

export default Timer