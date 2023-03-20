import React, { useState, useEffect } from "react";
import AccountHeader from "../../../components/accountHeader";
import { api } from "../../../axios/api.config";
import { ToastErrorMessage } from "../../../uitils/toastMessage";
import { useParams } from "react-router";
import { capitalizeFirstLetter } from "./../../../uitils/jsFunctions";
import { Avatar, Button, Card, CardActions, CardContent } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import CreateIcon from "@mui/icons-material/Create";
import { useSelector } from "react-redux";
import LoadingCircle from "../../../components/loading";
import Box from "@mui/material/Box";
import EditInternship from "../../../components/editInterShip";
import ViewWorkDetails from "../../../components/viewWorkDeatil";
import EditCertification from "../../../components/editCertification";

const MyInterships = () => {
  const {_id} = useSelector((state) => state.authReducer);
  const [getworkDetails, setGetworkDetails] = useState(false);
  const [workDetails, setWorkDeatils] = useState([]);
  const [certificationsDetails, setCertificationsDeatils] = useState([]);
  // const [userDetails, setUserDeatils] = useState({});
  const [isUser, setIsUser] = useState(false);
  const params = useParams();
  const [loading, setLoading] = useState(true)
  const [label, setLabel] = useState("")
  
  const [userDetails, setUserDetails] = useState({
    branch: "",
    mailId: "",
    phoneNumber: "",
    rollno: "",
    studentName: "",
    year: "",
    _id: "",
    profile: "",
  });
  console.log(isUser,'is user')
  
  useEffect(() => {
    if (!getworkDetails) {
      getworkDeatils();
      getUserDeatils();
      getcertificationDeatils();
    }
    setIsUser(_id === userDetails._id);
  }, [workDetails, userDetails]);

  const getworkDeatils = async () => {
    if (params.id) {
      setGetworkDetails(true);
      try {
        const responce = await api.post(`getWorkDeatils/student-works`, {
          id: params.id,
        });
        setWorkDeatils(responce.data);
        setLoading(false)
      } catch (error) {
        ToastErrorMessage(error.message);
      }
    }
  };

  const getUserDeatils = async () => {
    if (params.id) {
      try {
        const responce = await api.post(`auth/user`, {
          id: params.id,
        });
        setIsUser(_id==responce.data._id)
        setUserDetails(responce.data);
      } catch (error) {
        ToastErrorMessage(error.message);
      }
    }
  };

 
    const [open, setOpen] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [singleWorkDetails, setSingleWorkDetails] = useState({
      addWorkAt: "",
      companyName: "",
      completionCertificatepath: "",
      domain: "",
      end_date: "",
      offerLetterpath: "",
      role: "",
      start_date: "",
      status: "",
      stipend: "",
      studentDetails: {},
      studentId: "",
      type: "",
      updatedWorkAt: "",
      _id: "",
    });


    const [singlecertificationsDetails, setSinglecertificationsDeatils] = useState({
      addWorkAt: "",
      organizationName: "",
      completionCertificatepath: "",
      domain: "",
      end_date: "",
      start_date: "",
      status: "",
      studentDetails: {},
      studentId: "",
      updatedWorkAt: "",
      _id: "",
    });

    const getcertificationDeatils = async () => {
      if (params.id) {
        setGetworkDetails(true);
        try {
          const responce = await api.post(
            `getCertificationDeatils/student-certifications`,
            {
              id: params.id,
            }
          );
          setCertificationsDeatils(responce.data);
          setLoading(false);
        } catch (error) {
          ToastErrorMessage(error.message);
        }
      }
    };

    const handleClickOpenIntershipDetails = async (id) => {
      setOpen(true);
      setOrderId(id);
      setLabel("Internship");
      try {
        console.log(id, "id wfewef");
        const responce = await api.get(`getWorkDeatils/single-work/${id}`, {
          id: id,
        });
        setSingleWorkDetails(responce.data);
      } catch (error) {
        console.log(id, "id wfewef");
        ToastErrorMessage(error.message);
      }
    };
    const handleClickOpenCertificationDetails = async (id) => {
      setOpen(true);
      setLabel("Certification");
      try {
        console.log(id, "id wfewef");
        const responce = await api.get(
          `getCertificationDeatils/single-certification/${id}`,
          {
            id: id,
          }
        );
        setSinglecertificationsDeatils(responce.data);
      } catch (error) {
        console.log(id, "id wfewef");
        ToastErrorMessage(error.message);
      }
    };

  return (
    <div>
      {loading == true ? (
        <LoadingCircle />
      ) : (
        <div className="intershipsbody">
          <AccountHeader label={isUser ? "My Interships" : "Interships"} />

          {workDetails.length != 0 ? (
            <div>
              <div className="intershipsDiv">
                {workDetails?.map((work, index) => (
                  <Card className="intershipCard" key={index}>
                    <CardContent>
                      <div className="intershipTitleHeader">
                        <p className="intershipTitle">Student Details</p>
                        {isUser ? (
                          <EditInternship
                            workDetails={work}
                            setWorkDeatils={setWorkDeatils}
                          />
                        ) : null}
                      </div>
                      <div className="studentDetailsDiv">
                        <Avatar
                          alt={capitalizeFirstLetter(
                            userDetails.studentName?.charAt(0) || ""
                          )}
                          src={userDetails.profile}
                          sx={{
                            width: "80px",
                            height: "80px",
                            marginRight: 2,
                            fontSize: "60px",
                          }}
                        />
                        <div>
                          <p>{userDetails.studentName}</p>
                          <p>{userDetails.rollno}</p>
                          <p>
                            {userDetails.branch} {" , "}
                            {userDetails.year}
                          </p>
                        </div>
                      </div>
                      <div className="intershipTitleHeader">
                        <p className="intershipTitle">Intrnship Details</p>
                        <Button
                          className={work.status}
                          style={{
                            textDecoration: "none",
                            width: "10rem",
                            height: "30px",
                            borderRadius: "30px",
                            color: "#fff",
                          }}
                        >
                          {work.status}
                        </Button>
                      </div>
                      <div style={{ display: "grid", gap: "8px" }}>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <label style={{ fontWeight: "bold", width: "130px" }}>
                            Company Name
                          </label>
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                          <p>{work.companyName}</p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <label style={{ fontWeight: "bold", width: "130px" }}>
                            Type
                          </label>
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                          <p>{work.type}</p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <label style={{ fontWeight: "bold", width: "130px" }}>
                            Domain
                          </label>
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                          <p>{work.domain}</p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <label style={{ fontWeight: "bold", width: "130px" }}>
                            Role
                          </label>
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                          <p>{work.role}</p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <label style={{ fontWeight: "bold", width: "130px" }}>
                            Start Date
                          </label>
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                          <p>{work.start_date}</p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <label style={{ fontWeight: "bold", width: "130px" }}>
                            End Date
                          </label>
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                          <p>{work.end_date}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardActions
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        onClick={() =>
                          handleClickOpenIntershipDetails(work._id)
                        }
                        style={{
                          textDecoration: "none",
                          width: "10rem",
                          height: "30px",
                          borderRadius: "30px",
                          color: "#fff",
                        }}
                        className="internshipViewBtn"
                        endIcon={<EastIcon />}
                      >
                        View
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <p
              style={{
                color: "red",
                textAlign: "center",
                padding: "30px 0px",
              }}
            >
              No InternShips Add
            </p>
          )}
          <AccountHeader
            label={isUser ? "My Certifications" : "Certifications"}
          />
          {certificationsDetails.length != 0 ? (
            <div>
              <div className="intershipsDiv">
                {certificationsDetails?.map((certification, index) => (
                  <Card className="intershipCard" key={index}>
                    <CardContent>
                      <div className="intershipTitleHeader">
                        <p className="intershipTitle">Student Details</p>
                        {isUser ? (
                          <EditCertification
                            certificationsDetails={certification}
                            setCertificationsDeatils={setCertificationsDeatils}
                          />
                        ) : null}
                      </div>
                      <div className="studentDetailsDiv">
                        <Avatar
                          alt={capitalizeFirstLetter(
                            userDetails.studentName?.charAt(0) || ""
                          )}
                          src={userDetails.profile}
                          sx={{
                            width: "80px",
                            height: "80px",
                            marginRight: 2,
                            fontSize: "60px",
                          }}
                        />
                        <div>
                          <p>{userDetails.studentName}</p>
                          <p>{userDetails.rollno}</p>
                          <p>
                            {userDetails.branch} {" , "}
                            {userDetails.year}
                          </p>
                        </div>
                      </div>
                      <div className="intershipTitleHeader">
                        <p className="intershipTitle">Intrnship Details</p>
                        <Button
                          className={certification.status}
                          style={{
                            textDecoration: "none",
                            width: "10rem",
                            height: "30px",
                            borderRadius: "30px",
                            color: "#fff",
                          }}
                        >
                          {certification.status}
                        </Button>
                      </div>
                      <div style={{ display: "grid", gap: "8px" }}>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <label style={{ fontWeight: "bold", width: "150px" }}>
                            Organization Name
                          </label>
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                          <p>{certification.organizationName}</p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <label style={{ fontWeight: "bold", width: "150px" }}>
                            Domain
                          </label>
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                          <p>{certification.domain}</p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <label style={{ fontWeight: "bold", width: "150px" }}>
                            Start Date
                          </label>
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                          <p>{certification.start_date}</p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <label style={{ fontWeight: "bold", width: "150px" }}>
                            End Date
                          </label>
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                          <p>{certification.end_date}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardActions
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        onClick={() =>
                          handleClickOpenCertificationDetails(certification._id)
                        }
                        style={{
                          textDecoration: "none",
                          width: "10rem",
                          height: "30px",
                          borderRadius: "30px",
                          color: "#fff",
                        }}
                        className="internshipViewBtn"
                        endIcon={<EastIcon />}
                      >
                        View
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <p
              style={{
                color: "red",
                textAlign: "center",
                padding: "30px 0px",
              }}
            >
              No InternShips Add
            </p>
          )}
        </div>
      )}
      <ViewWorkDetails
        open={open}
        setOpen={setOpen}
        singleWorkDetails={singleWorkDetails}
        singlecertificationsDetails={singlecertificationsDetails}
        studentDetails={userDetails}
        label={label}
      />
    </div>
  );
};

export default MyInterships;
