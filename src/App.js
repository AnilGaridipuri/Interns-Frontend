import './App.css';
import MyRoutes from './router'
import NavBar from "../src/components/Navbar/navbar"
import Footer from "../src/components/Footer/footer"
import { Navigate } from "react-router-dom";
import {useState,useEffect} from 'react';
import { ApplicationConstant } from "../src/constant/applicationConstant";
import { api } from "./axios/api.config";
import { ToastErrorMessage, ToastSuccessMessage } from "./uitils/toastMessage";
import { useDispatch } from "react-redux";
import { setAuthentication } from './store/slices/auth';

function App() {

  const dispatch = useDispatch();
  const [getuserDetails, setGetuserDetails] = useState(false);

   const [userDetails, setUserDeatils] = useState({
     name: "",
     profile: "",
     _id: "",
   });

  const id = localStorage.getItem("MITSinternsid");
  console.log(id)

  useEffect(() => {
    if (!getuserDetails) {
      getUserDeatils();
    }
  }, [userDetails]);

  const getUserDeatils = async () => {
    if (id) {
      setGetuserDetails(true);
      try {
        const responce = await api.post(`auth/user`, {
          id:id,
        });
        dispatch(
           setAuthentication({
             isAuthenticated: true,
             username: responce.data.username,
             _id: responce.data._id,
             mailId: responce.data.mailId
           })
         );
      } catch (error) {
        ToastErrorMessage(error.message);
      }
    }
  };


  return (
    <div>
      <NavBar />
      <MyRoutes />
      <Footer />
    </div>
  );
}

export default App;
