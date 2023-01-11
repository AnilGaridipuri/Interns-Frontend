import './App.css';
import MyRoutes from './router'
import NavBar from "../src/components/Navbar/navbar"
import SideBar from "../src/components/sideBar/sidebar"
import Footer from "../src/components/Footer/footer"
import { Navigate } from "react-router-dom";
import {useState,useEffect} from 'react';
import { ApplicationConstant } from "../src/constant/applicationConstant";

function App() {
  
  // const [anthacation, setAnthacation] = useState(false)
  // useEffect(() => {
  //   if (!anthacation){
  //      return <Navigate to={ApplicationConstant.LOGIN_URL_PATH} replace />
  //   }
  // }, [])

  return (
    <div>
      <NavBar/>
      <MyRoutes/>
      <Footer/>
    </div>
  );
}

export default App;
