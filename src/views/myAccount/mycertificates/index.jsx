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

  console.log(isUser, "is user");

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
        setLoading(false);
      } catch (error) {
        ToastErrorMessage(error.message);
      }
    }
  };

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

  const updateCertificationDeatils = async (id) => {
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
      {loading == true ? (
        <LoadingCircle />
      ) : (
        <div className="intershipsbody intershipCertificationBackGround">
          <AccountHeader label="Internship Certificates" />
          {workDetails.length != 0 ? (
            <div>
              <div className="certificatesDiv">
                {workDetails?.map((work, index) => (
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
                        <p className="intershipTitle">Intrnship Details</p>

                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <label style={{ fontWeight: "bold", width: "40px" }}>
                            Status
                          </label>
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
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
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
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
                      </div>
                    </CardContent>
                    {work.completionCertificatepath ? (
                      <div style={{ height: 700 }}>
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          height="700px"
                          width="610px"
                          image={work.completionCertificatepath}
                          style={{ objectFit: "fill" }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          height: "700px",
                          display: "grid",
                          placeContent: "center",
                        }}
                      >
                        {work.status == "Completed" ? (
                          <div>
                            <div className="addInternInputs">
                              <p style={{ color: "red" }}>
                                Completion Certificate Not Upload
                              </p>
                              {isUser == true ? (
                                <div>
                                  <label>Completion Certificate :</label>
                                  <TextField
                                    onChange={handleOnImageChange}
                                    name="completionCertificatepath"
                                    type="file"
                                    multiple
                                    size="small"
                                    id="outlined-basic"
                                  />
                                </div>
                              ) : null}
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
                            {isUser == true ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "10px  0px",
                                }}
                              >
                                <Button
                                  className="editUserBtn btnUpdate"
                                  onClick={() => updateWorkDeatils(work._id)}
                                >
                                  Update
                                </Button>
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <p style={{ color: "red" }}>
                            This Internship Not Completed Yet If Complete Please
                            Update
                          </p>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
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
          <AccountHeader label="Certificatoins" />
          {certificationsDetails.length != 0 ? (
            <div>
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
                          <label style={{ fontWeight: "bold", width: "40px" }}>
                            Status
                          </label>
                          <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
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
                      <div style={{ height: 700 }}>
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          height="700px"
                          width="610px"
                          image={certification.completionCertificatepath}
                          style={{ objectFit: "fill" }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          height: "700px",
                          display: "grid",
                          placeContent: "center",
                        }}
                      >
                        {certification.status == "Completed" ? (
                          <div>
                            <div className="addInternInputs">
                              <p style={{ color: "red" }}>
                                Completion Certificate Not Upload
                              </p>
                              {isUser == true ? (
                                <div>
                                  <label>Completion Certificate :</label>
                                  <TextField
                                    onChange={handleOnImageChange}
                                    name="completionCertificatepath"
                                    type="file"
                                    multiple
                                    size="small"
                                    id="outlined-basic"
                                  />
                                </div>
                              ) : null}
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
                            {isUser == true ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "10px  0px",
                                }}
                              >
                                <Button
                                  className="editUserBtn btnUpdate"
                                  onClick={() =>
                                    updateCertificationDeatils(
                                      certification._id
                                    )
                                  }
                                >
                                  Update
                                </Button>
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <p style={{ color: "red" }}>
                            This Certification Not Completed Yet If Complete
                            Please Update
                          </p>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
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
