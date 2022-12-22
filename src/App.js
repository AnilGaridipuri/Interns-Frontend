import './App.css';
import MyRoutes from './router'
import NavBar from "../src/components/Navbar/navbar"
// import { Navigate } from "react-router-dom";
// import {useState} from 'react';
// import { ApplicationConstant } from "../src/constant/applicationConstant";

function App() {

  // const [anthacation, setAnthacation] = useState(false)
  // if (!anthacation){
  //    return <Navigate to={ApplicationConstant.LOGIN_URL_PATH} replace />
  // }
  return (
    <div>
      <NavBar/>
      <MyRoutes/>
    </div>
  );
}

export default App;
