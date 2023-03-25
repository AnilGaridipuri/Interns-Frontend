import React, { useState, useEffect } from "react";
import AccountHeader from "../../../components/accountHeader";
import { ToastErrorMessage, ToastSuccessMessage } from "../../../uitils/toastMessage";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { api } from "../../../axios/api.config";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import LoadingCircle from "../../../components/loading";
import { textAlign } from "@mui/system";
import EditCertification from "../../../components/editCertification";

const MyCertificates = () => {
  const { _id } = useSelector((state) => state.authReducer);
  const [getworkDetails, setGetworkDetails] = useState(false);
  const [workDetails, setWorkDeatils] = useState([]);
  const [certificationsDetails, setCertificationsDeatils] = useState([]);
  const [userDetails, setUserDeatils] = useState({});
  const [isUser, setIsUser] = useState(_id === userDetails._id);
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const [completionCertificatepath, setCompletionCertificatepath] = useState("")
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  console.log(isUser, "is user");

  useEffect(() => {
    if (!getworkDetails) {
      getUserDeatils();
      getcertificationDeatils();
    }
    setIsUser(_id === userDetails._id);
  }, [ userDetails]);

  const getcertificationDeatils = async () => {
    if (params.id) {
      setGetworkDetails(true);
      try {
        const {data} = await api.post(
          `getCertificationDeatils/student-certifications`,
          {
            id: params.id,
          }
        );
        const ongoing = data.filter( (certification) => certification.status==='Ongoing')
        const completed = data.filter( (certification) => certification.status==='Completed')
        setLoading(false);
        setCertificationsDeatils(completed.concat(ongoing));
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
        setIsUser(_id == responce.data._id);
        setUserDeatils(responce.data);
      } catch (error) {
        ToastErrorMessage(error.message);
      }
    }
  };

  const updateWorkDeatils = async (id) => {
    if (isUser) {
      try {
        const responce = await api.put(`/update-work-certificate`, {
          workId:id,
          studentId:params.id,
          completionCertificatepath: completionCertificatepath,
        });
        setWorkDeatils(responce.data);
        setCompletionCertificatepath("");
        ToastSuccessMessage("Successfully Uploaded !!");
      } catch (error) {
        ToastErrorMessage(error.response.data || error.message);
      }
    }
  };

  // const updateCertificationDeatils = async (id) => {
  //   if (isUser) {
  //     try {
  //       const responce = await api.put(`/update-work-certificate`, {
  //         workId:id,
  //         studentId:params.id,
  //         completionCertificatepath: completionCertificatepath,
  //       });
  //       setWorkDeatils(responce.data);
  //       setCompletionCertificatepath("");
  //       ToastSuccessMessage("Successfully Uploaded !!");
  //     } catch (error) {
  //       ToastErrorMessage(error.response.data || error.message);
  //     }
  //   }
  // };

   const handleOnImageChange = async (e) => {
    const filelist = e.target.files[0];
    const base64 = await convertBase64(filelist);
    setCompletionCertificatepath(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  return (
    <div>
      {loading === true ? (
        <LoadingCircle />
      ) : (
        <div className="intershipsbody intershipCertificationBackGround">
         
          <AccountHeader label="Certifications" />
          {certificationsDetails.length != 0 ? (
              <div className="certificatesDiv">
                {certificationsDetails?.map((certification, index) => (
                  <Card key={index} className="certificatesCard">
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <p className="intershipTitle">Certification Details</p>

                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          {/* <label style={{ fontWeight: "bold", width: "40px" }}>
                            Status
                          </label> 
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p> */}
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
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
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

                    {certification.completionCertificatepath ? (
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          image={certification.completionCertificatepath}
                          style={{ 
                            minHeight:"400px",
                            maxHeight: "400px",
                            maxWidth: "97%",
                            objectFit: "contain",
                            boxShadow:"0 0px 3px 1px grey",
                            margin:"auto 10px",
                            padding :"5px"
                          }}
                        />
                    ) : (
                      <div
                        style={{
                          height: "400px",
                          display: "grid",
                          placeContent: "center",
                        }}
                      >
                        {certification.status == "Completed" ? (
                          <div>
                            <div className="addInternInputs">
                              <p style={{ color: "red" }}>
                                { isUser ? "Please upload " : null} 
                                Completion Certificate.
                              </p>
                            </div>
                            {completionCertificatepath ? (
                              <img
                                src={completionCertificatepath}
                                style={{
                                  width: "300px",
                                  height: "270px",
                                  objectfit: "fill",
                                  marginleft: "30px",
                                }}
                                alt="preview image"
                              />
                            ) : null}
                            
                          </div>
                        ) : (
                          <p style={{ color: "red" }}>
                            This Certification is Not Completed Yet.
                            { isUser ? "If Completed, Please Update " : null} 
                          </p>
                        )}
                      </div>
                    )}
                    {isUser ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "10px  0px",
                          }}
                        >
                          
                          <EditCertification 
                                certificationDetails={certification}
                                setCertificationsDeatils={setCertificationsDeatils}
                                // onClick={handleClickOpen}
                                // open={open}
                                // setOpen={setOpen}
                              />
                        </div>
                      ) : null
                    }
                  </Card>
                ))}
              </div>
          ) : (
            <div
              style={{
                color: "red",
                textAlign: "center",
                padding: "30px 0px",
              }}
            >
              <p>No Certifications</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCertificates;
