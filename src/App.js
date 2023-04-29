import "./App.css";
import MyRoutes from "./router";
import NavBar from "../src/components/Navbar/navbar";
import Footer from "../src/components/Footer/footer";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApplicationConstant } from "../src/constant/applicationConstant";
import { api } from "./axios/api.config";
import { ToastErrorMessage, ToastSuccessMessage } from "./uitils/toastMessage";
import { useDispatch } from "react-redux";
import { setAuthentication } from "./store/slices/auth";
import { useLocation } from 'react-router-dom'


function App() {
  const dispatch = useDispatch();
  const [getuserDetails, setGetuserDetails] = useState(false);

  const [userDetails, setUserDeatils] = useState({
  });

  const id = localStorage.getItem("MITSinternsid");
  // console.log(id);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]);

  useEffect(() => {
    if (!getuserDetails) {
      getUserDeatils();
    }
  }, [userDetails, id]);

  const getUserDeatils = async () => {
    if (id) {
      setGetuserDetails(true);
      try {
        const responce = await api.post(`auth/user`, {
          id: id,
        });
        dispatch(
          setAuthentication({
            isAuthenticated: true,
            rollno: responce.data.rollno || "",
            _id: responce.data._id,
            mailId: responce.data.mailId,
            studentName: responce.data.studentName || "",
            year: responce.data.year || "",
            branch: responce.data.branch || "",
            phoneNumber: responce.data.phoneNumber || "",
            profile: responce.data.profile || "",
            section: responce.data.section || "",
            altmail: responce.data.altmail || "",
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
